/**
 * Multi-Attachment Inserter - 附件插入器
 * 支持移动端和桌面端
 */

import { App, Plugin, Notice, MarkdownView, Platform, Modal, ButtonComponent, TFolder } from 'obsidian';
import type { MobileAttachmentInserterSettings, FileProcessResult } from './types';
import { t, setLanguage, getSystemLanguage } from './i18n';

// 插件版本和作者（统一管理）
const PLUGIN_VERSION = '0.1.0';
const PLUGIN_AUTHOR = 'heyoujiang';
const PLUGIN_ID = 'multi-attachment-inserter';

// 默认设置
const DEFAULT_SETTINGS: MobileAttachmentInserterSettings = {
    defaultPickerPath: '',
    cameraSavePath: '',
    saveToGallery: true,
    showGalleryNotice: true,
    showToolbarAttachButton: true,
    showToolbarCameraButton: true,
    showSavingNotice: true,
    showInsertNotice: true,
    maxFileSize: 0,
};

// 默认附件文件夹名称
const DEFAULT_ATTACHMENT_FOLDER = 'attachments';

export default class MobileAttachmentInserter extends Plugin {
    settings: MobileAttachmentInserterSettings;
    private toolbarButtonsAdded: boolean = false;
    private toolbarDebounceTimer: ReturnType<typeof setTimeout> | null = null;

    async onload() {
        // 加载语言
        const lang = getSystemLanguage();
        setLanguage(lang);
        console.log(`[${PLUGIN_ID}] Language: ${lang}, Version: ${PLUGIN_VERSION}`);

        // 加载设置
        await this.loadSettings();

        // 动态导入设置模块（带异常处理）
        try {
            const { MobileAttachmentInserterSettingTab } = await import('./settings');
            if (MobileAttachmentInserterSettingTab) {
                this.addSettingTab(new MobileAttachmentInserterSettingTab(this.app, this));
            }
        } catch (e) {
            console.error(`[${PLUGIN_ID}] Failed to load settings module:`, e);
        }

        // 注册功能区和命令
        this.registerRibbonAndCommands();
        
        // 添加编辑器工具栏按钮（移动端和桌面端）
        this.addEditorToolbarButtons();

        console.log(`[${PLUGIN_ID}] Plugin loaded successfully`);
    }

    onunload() {
        // 清理工具栏按钮
        this.removeToolbarButtons();
        
        // 清理定时器
        if (this.toolbarDebounceTimer) {
            clearTimeout(this.toolbarDebounceTimer);
        }
        
        console.log(`[${PLUGIN_ID}] Plugin unloaded`);
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
        
        // 确保 maxFileSize 字段存在（兼容旧版本）
        if (this.settings.maxFileSize === undefined) {
            this.settings.maxFileSize = 0;
        }
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }

    getPlatform(): 'mobile' | 'desktop' {
        return Platform.isMobile ? 'mobile' : 'desktop';
    }

    private registerRibbonAndCommands() {
        // 功能区 - 插入附件
        this.addRibbonIcon('paperclip', t('ribbon_insert_attachments'), async () => {
            await this.handleInsertAttachments();
        });

        // 功能区 - 拍照（仅移动端）
        if (Platform.isMobile) {
            this.addRibbonIcon('camera', t('ribbon_take_photo'), async () => {
                await this.shootAndInsert();
            });
        }

        // 命令 - 插入多个附件
        this.addCommand({
            id: 'pick-multiple-attachments',
            name: t('command_insert_attachments'),
            callback: async () => await this.handleInsertAttachments()
        });

        // 命令 - 拍照并插入（仅移动端）
        if (Platform.isMobile) {
            this.addCommand({
                id: 'shoot-and-insert',
                name: t('command_take_photo'),
                callback: async () => await this.shootAndInsert()
            });
        }
    }

    async handleInsertAttachments() {
        if (Platform.isMobile) {
            await this.pickAndInsertMultipleMobile();
        } else {
            await this.pickAndInsertMultipleDesktop();
        }
    }

    private removeToolbarButtons() {
        const existingToolbar = document.querySelector('.mobile-attachment-toolbar');
        if (existingToolbar) {
            existingToolbar.remove();
        }
        this.toolbarButtonsAdded = false;
    }

    private addEditorToolbarButtons() {
        this.registerEvent(this.app.workspace.on('layout-change', () => {
            this.debouncedAddToolbarButtons();
        }));

        this.registerEvent(this.app.workspace.on('active-leaf-change', () => {
            this.debouncedAddToolbarButtons();
        }));

        setTimeout(() => {
            this.tryAddToolbarButtons();
        }, 1000);
    }

    private debouncedAddToolbarButtons() {
        if (this.toolbarDebounceTimer) {
            clearTimeout(this.toolbarDebounceTimer);
        }
        
        this.toolbarDebounceTimer = setTimeout(() => {
            this.tryAddToolbarButtons();
        }, 300);
    }

    private tryAddToolbarButtons() {
        if (!this.settings.showToolbarAttachButton && !this.settings.showToolbarCameraButton) {
            this.removeToolbarButtons();
            return;
        }

        const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
        if (!activeView) {
            this.removeToolbarButtons();
            return;
        }

        let toolbarContainer = activeView.containerEl.querySelector('.mobile-attachment-toolbar');
        
        if (toolbarContainer) {
            if (this.toolbarButtonsAdded) return;
            toolbarContainer.remove();
        }

        // 在编辑器底部创建工具栏
        toolbarContainer = activeView.containerEl.createDiv({ cls: 'mobile-attachment-toolbar' });

        if (this.settings.showToolbarAttachButton) {
            const attachBtn = toolbarContainer.createEl('button', {
                cls: 'mobile-attachment-btn',
                attr: { 'aria-label': t('ribbon_insert_attachments') }
            });
            attachBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>';
            attachBtn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.handleInsertAttachments();
            };
        }

        if (Platform.isMobile && this.settings.showToolbarCameraButton) {
            const cameraBtn = toolbarContainer.createEl('button', {
                cls: 'mobile-attachment-btn',
                attr: { 'aria-label': t('ribbon_take_photo') }
            });
            cameraBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>';
            cameraBtn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.shootAndInsert();
            };
        }

        this.toolbarButtonsAdded = true;
        console.log(`[${PLUGIN_ID}] Editor toolbar buttons added`);
    }

    private normalizePath(path: string): string {
        const parts = path.split('/').filter(p => p && p !== '..');
        return parts.join('/');
    }

    /**
     * 获取默认附件文件夹
     */
    private async getDefaultAttachmentFolder(): Promise<string> {
        try {
            // 尝试获取 Obsidian 的附件设置
            const vault = this.app.vault;
            const config = (vault as unknown as { getConfig: (key: string) => unknown }).getConfig;
            const attachmentPath = config('attachmentFolderPath') as string;
            
            if (attachmentPath && attachmentPath !== './') {
                return attachmentPath;
            }
            
            // 检查 vault 根目录是否有 attachments 文件夹
            const attachmentsFolder = vault.getAbstractFileByPath(DEFAULT_ATTACHMENT_FOLDER);
            if (attachmentsFolder && attachmentsFolder instanceof TFolder) {
                return DEFAULT_ATTACHMENT_FOLDER;
            }
            
            // 创建默认 attachments 文件夹
            await vault.createFolder(DEFAULT_ATTACHMENT_FOLDER);
            return DEFAULT_ATTACHMENT_FOLDER;
        } catch (e) {
            console.error(`[${PLUGIN_ID}] Error getting default folder:`, e);
            return '';
        }
    }

    getTargetFolderPath(): string {
        try {
            const vault = this.app.vault;
            const config = (vault as unknown as { getConfig: (key: string) => unknown }).getConfig;
            const attachmentSetting = (config('attachmentFolderPath') as string) || '';
            const activeFile = this.app.workspace.getActiveFile();
            let targetFolder = this.settings.cameraSavePath || attachmentSetting || '';

            if (targetFolder === './' || targetFolder === '.') {
                targetFolder = activeFile?.parent?.path || '';
            } else if (targetFolder.startsWith('./')) {
                const relative = targetFolder.substring(2);
                targetFolder = activeFile?.parent ? `${activeFile.parent.path}/${relative}` : relative;
            } else if (targetFolder.startsWith('/')) {
                targetFolder = targetFolder.substring(1);
            }
            
            targetFolder = this.normalizePath(targetFolder);
            
            return targetFolder;
        } catch (e) {
            console.error(`[${PLUGIN_ID}] Error getting target folder:`, e);
            return '';
        }
    }

    /**
     * 获取最终有效的目标文件夹路径
     */
    async getEffectiveTargetFolderPath(): Promise<string> {
        let targetFolder = this.getTargetFolderPath();
        
        // 如果路径为空，使用默认附件文件夹
        if (!targetFolder) {
            targetFolder = await this.getDefaultAttachmentFolder();
        }
        
        return targetFolder;
    }

    async ensureFolder(path: string): Promise<boolean> {
        if (!path) return false;
        
        try {
            const folder = this.app.vault.getAbstractFileByPath(path);
            if (folder) return true;

            const parts = path.split('/').filter(p => p);
            let currentPath = '';
            
            for (const part of parts) {
                currentPath = currentPath ? `${currentPath}/${part}` : part;
                const currentFolder = this.app.vault.getAbstractFileByPath(currentPath);
                if (!currentFolder) {
                    await this.app.vault.createFolder(currentPath);
                    console.log(`[${PLUGIN_ID}] Created folder: ${currentPath}`);
                }
            }
            return true;
        } catch (e) {
            console.error(`[${PLUGIN_ID}] Failed to create folder: ${path}`, e);
            return false;
        }
    }

    async getUniqueFileName(folder: string, baseName: string): Promise<string> {
        const ext = baseName.includes('.') ? baseName.split('.').pop() : '';
        const nameWithoutExt = baseName.includes('.') ? baseName.substring(0, baseName.lastIndexOf('.')) : baseName;
        
        let finalName = baseName;
        let counter = 1;
        
        const checkPath = folder ? `${folder}/${finalName}` : finalName;
        while (await this.app.vault.getAbstractFileByPath(checkPath)) {
            finalName = `${nameWithoutExt} ${counter}.${ext}`;
            counter++;
        }
        
        return finalName;
    }

    validateFile(file: File): { valid: boolean; reason?: string } {
        if (this.settings.maxFileSize > 0) {
            const fileSizeMB = file.size / (1024 * 1024);
            if (fileSizeMB > this.settings.maxFileSize) {
                return { 
                    valid: false, 
                    reason: t('notice_file_too_large', { 
                        name: file.name, 
                        size: this.settings.maxFileSize.toString() 
                    }) 
                };
            }
        }
        
        return { valid: true };
    }

    isImageFile(file: File): boolean {
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg', 'ico', 'tiff', 'tif'];
        const fileName = file.name.toLowerCase();
        const ext = fileName.includes('.') ? fileName.split('.').pop() || '' : '';
        
        return file.type.startsWith('image/') || imageExtensions.includes(ext);
    }

    async insertLinkToEditor(filePath: string, isImage: boolean = false) {
        const link = isImage ? `![[${filePath}]]` : `[[${filePath}]]`;
        
        const view = this.app.workspace.getActiveViewOfType(MarkdownView);
        if (view) {
            const editor = view.editor;
            const cursor = editor.getCursor();
            const line = editor.getLine(cursor.line);
            
            if (line.trim() !== '') {
                editor.replaceSelection('\n' + link + '\n');
            } else {
                editor.replaceSelection(link + '\n');
            }
        } else {
            // 没有活动编辑器时复制到剪贴板
            try {
                await navigator.clipboard.writeText(link);
                new Notice(t('notice_no_editor'));
            } catch (e) {
                console.error(`[${PLUGIN_ID}] Clipboard error:`, e);
            }
        }
    }

    public showNotice(message: string, show: boolean): void {
        if (show) {
            new Notice(message);
        }
    }

    // 桌面端文件选择
    async pickAndInsertMultipleDesktop() {
        return new Promise<void>((resolve) => {
            const input = document.createElement('input');
            input.type = 'file';
            input.multiple = true;
            input.accept = '*/*';
            
            input.onchange = async (e: Event) => {
                const target = e.target as HTMLInputElement;
                const files = target.files;
                
                if (!files || files.length === 0) {
                    resolve();
                    return;
                }

                await this.processFilesDesktop(files);
                resolve();
            };

            input.click();
        });
    }

    async processFilesDesktop(files: FileList) {
        const totalFiles = files.length;
        this.showNotice(t('notice_processing_files', { count: totalFiles }), this.settings.showSavingNotice);

        let successCount = 0;
        let skippedCount = 0;
        const links: string[] = [];

        for (let i = 0; i < files.length; i++) {
            const result = await this.processFileDesktop(files[i]);
            
            if (result.skipped) {
                skippedCount++;
                if (result.skipReason) {
                    this.showNotice(result.skipReason, true);
                }
            } else if (result.success && result.filePath) {
                successCount++;
                const isImage = this.isImageFile(files[i]);
                links.push(isImage ? `![[${result.filePath}]]` : `[[${result.filePath}]]`);
            }
        }

        if (links.length > 0) {
            const view = this.app.workspace.getActiveViewOfType(MarkdownView);
            if (view) {
                const editor = view.editor;
                editor.replaceSelection(links.join('\n') + '\n');
            }
        }

        if (successCount > 0) {
            this.showNotice(t('notice_insert_success', { count: successCount }), this.settings.showInsertNotice);
        }
    }

    async processFileDesktop(file: File): Promise<FileProcessResult> {
        const validation = this.validateFile(file);
        if (!validation.valid) {
            return { success: false, skipped: true, skipReason: validation.reason };
        }

        try {
            // 获取有效的目标文件夹
            const targetFolder = await this.getEffectiveTargetFolderPath();
            
            if (!targetFolder) {
                return { success: false, error: t('notice_folder_error') };
            }
            
            if (!await this.ensureFolder(targetFolder)) {
                return { success: false, error: t('notice_folder_error') };
            }

            const normalizedName = this.normalizePath(file.name);
            const uniqueName = await this.getUniqueFileName(targetFolder, normalizedName);
            const targetPath = targetFolder ? `${targetFolder}/${uniqueName}` : uniqueName;

            const arrayBuffer = await file.arrayBuffer();
            await this.app.vault.createBinary(targetPath, arrayBuffer);
            console.log(`[${PLUGIN_ID}] File saved to Vault: ${targetPath}`);

            return { success: true, filePath: targetPath };
        } catch (e) {
            const errorMessage = e instanceof Error ? e.message : String(e);
            console.error(`[${PLUGIN_ID}] Process file error:`, e);
            return { success: false, error: errorMessage };
        }
    }

    // 移动端文件选择
    async pickAndInsertMultipleMobile() {
        if (!Platform.isMobile) {
            new Notice(t('notice_desktop_only'));
            return;
        }

        return new Promise<void>((resolve) => {
            const input = document.createElement('input');
            input.type = 'file';
            input.multiple = true;
            input.accept = '*/*';
            
            input.onchange = async (e: Event) => {
                const target = e.target as HTMLInputElement;
                const files = target.files;
                
                if (!files || files.length === 0) {
                    resolve();
                    return;
                }

                this.showNotice(t('notice_processing_files', { count: files.length }), this.settings.showSavingNotice);

                let successCount = 0;
                for (let i = 0; i < files.length; i++) {
                    const success = await this.processFileMobile(files[i], false);
                    if (success) successCount++;
                }

                this.showNotice(t('notice_insert_success', { count: successCount }), this.settings.showInsertNotice);
                resolve();
            };

            input.click();
        });
    }

    async shootAndInsert() {
        if (!Platform.isMobile) {
            new Notice(t('notice_desktop_only'));
            return;
        }

        const modal = new CameraSessionModal(this.app, this);
        modal.open();
    }

    async processFileMobile(file: File, saveToGallery: boolean = false): Promise<boolean> {
        const validation = this.validateFile(file);
        if (!validation.valid) {
            new Notice(validation.reason || t('notice_file_too_large', { name: file.name, size: this.settings.maxFileSize.toString() }));
            return false;
        }

        try {
            const targetFolder = await this.getEffectiveTargetFolderPath();
            
            if (!targetFolder || !await this.ensureFolder(targetFolder)) {
                new Notice(t('notice_folder_error'));
                return false;
            }

            const normalizedName = this.normalizePath(file.name);
            const uniqueName = await this.getUniqueFileName(targetFolder, normalizedName);
            const targetPath = targetFolder ? `${targetFolder}/${uniqueName}` : uniqueName;

            const arrayBuffer = await file.arrayBuffer();
            await this.app.vault.createBinary(targetPath, arrayBuffer);
            console.log(`[${PLUGIN_ID}] File saved to Vault: ${targetPath}`);

            const isImage = this.isImageFile(file);

            if (isImage && saveToGallery && this.settings.saveToGallery) {
                await this.saveToGallery(file);
            }

            await this.insertLinkToEditor(targetPath, isImage);

            return true;
        } catch (e: unknown) {
            const errorMessage = e instanceof Error ? e.message : String(e);
            console.error(`[${PLUGIN_ID}] Process file error:`, e);
            new Notice(t('notice_process_error', { error: errorMessage }));
            return false;
        }
    }

    // 相册保存功能
    public async openAppSettings(): Promise<void> {
        new Notice('请在系统设置中开启存储权限后重试');
    }

    async saveToGallery(file: File): Promise<boolean> {
        if (!Platform.isMobile) return false;

        try {
            if (!this.isImageFile(file)) {
                return false;
            }

            console.log(`[${PLUGIN_ID}] Saving to gallery:`, file.name);

            if (!this.settings.saveToGallery) {
                console.log(`[${PLUGIN_ID}] Save to gallery disabled in settings`);
                return false;
            }

            // 尝试使用 Web Share API 作为备选（跨平台）
            if (navigator.share && navigator.canShare?.({ files: [file] })) {
                console.log(`[${PLUGIN_ID}] Using Web Share API`);
                try {
                    await navigator.share({
                        files: [file],
                        title: 'Save to Gallery'
                    });
                    this.showNotice(t('notice_saved_to_gallery'), this.settings.showGalleryNotice);
                    return true;
                } catch (shareError) {
                    console.log(`[${PLUGIN_ID}] Share cancelled or failed:`, shareError);
                }
            }

            // 尝试使用 Capacitor 插件（如果存在）
            const win = window as unknown as { Capacitor?: { Plugins?: { Filesystem?: unknown } }; getPlatform?: () => string };
            const capacitor = win.Capacitor;
            
            if (capacitor) {
                const platform = typeof win.getPlatform === 'function' ? win.getPlatform() : 'android';
                
                if (platform === 'android') {
                    const result = await this.trySaveToGalleryAndroid(file);
                    if (result) return true;
                }
            }

            this.showNotice(t('notice_gallery_limited'), this.settings.showGalleryNotice);
            console.log(`[${PLUGIN_ID}] Gallery save not supported on this device`);
            
            return false;
        } catch (e) {
            console.error(`[${PLUGIN_ID}] Save to gallery error:`, e);
            return false;
        }
    }

    private async trySaveToGalleryAndroid(file: File): Promise<boolean> {
        const win = window as unknown as { Capacitor?: { Plugins?: { Filesystem?: { writeFile: (options: unknown) => Promise<void> } } } };
        const Filesystem = win.Capacitor?.Plugins?.Filesystem;
        
        if (!Filesystem) return false;

        const fileName = `Obsidian_${Date.now()}_${file.name}`;
        const base64 = await this.fileToBase64(file);

        try {
            await Filesystem.writeFile({
                path: `Pictures/Obsidian/${fileName}`,
                data: base64,
                directory: 'External',
                encoding: 'base64'
            });
            
            this.showNotice(t('notice_saved_to_gallery'), this.settings.showGalleryNotice);
            return true;
        } catch (fsError) {
            console.error(`[${PLUGIN_ID}] Filesystem write error:`, fsError);
            
            try {
                await Filesystem.writeFile({
                    path: `DCIM/Obsidian/${fileName}`,
                    data: base64,
                    directory: 'Documents',
                    encoding: 'base64'
                });
                this.showNotice(t('notice_saved_to_gallery'), this.settings.showGalleryNotice);
                return true;
            } catch (e2) {
                console.error(`[${PLUGIN_ID}] Fallback save error:`, e2);
            }
        }

        return false;
    }

    private fileToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const result = reader.result as string;
                const base64 = result.split(',')[1];
                resolve(base64);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }
}

// ===========================================================================
// 权限拒绝提示弹窗
// ===========================================================================

class PermissionDeniedModal extends Modal {
    plugin: MobileAttachmentInserter;

    constructor(app: App, plugin: MobileAttachmentInserter) {
        super(app);
        this.plugin = plugin;
    }

    onOpen() {
        const { contentEl } = this;
        contentEl.empty();

        contentEl.createEl('h2', { text: t('notice_gallery_permission_required') });
        
        const descEl = contentEl.createEl('p');
        descEl.textContent = '要保存照片到系统相册，需要授予存储权限。';
        descEl.style.margin = '1em 0';

        const buttonGroup = contentEl.createDiv({ cls: 'permission-modal-buttons' });
        buttonGroup.style.display = 'flex';
        buttonGroup.style.gap = '10px';
        buttonGroup.style.justifyContent = 'center';
        buttonGroup.style.marginTop = '20px';

        new ButtonComponent(buttonGroup)
            .setButtonText('打开设置')
            .setCta()
            .onClick(() => {
                this.plugin.openAppSettings();
                this.close();
            });

        new ButtonComponent(buttonGroup)
            .setButtonText(t('modal_cancel'))
            .onClick(() => {
                this.close();
            });
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }
}

// ===========================================================================
// 拍照模态框
// ===========================================================================

class CameraSessionModal extends Modal {
    plugin: MobileAttachmentInserter;
    capturedPhotos: File[] = [];
    isCapturing: boolean = false;
    private statusEl: HTMLElement;
    private buttonGroup: HTMLElement;

    constructor(app: App, plugin: MobileAttachmentInserter) {
        super(app);
        this.plugin = plugin;
    }

    onOpen() {
        const { contentEl } = this;
        contentEl.empty();

        contentEl.createEl('h2', { text: t('modal_camera_title') });

        this.statusEl = contentEl.createDiv({ cls: 'camera-session-status' });
        this.statusEl.setText(t('modal_camera_ready'));

        this.buttonGroup = contentEl.createDiv({ cls: 'camera-session-buttons' });

        this.captureNext();
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }

    updateUI() {
        this.statusEl.setText(t('modal_camera_count', { count: this.capturedPhotos.length }));
        this.buttonGroup.empty();

        if (this.capturedPhotos.length === 0) {
            new ButtonComponent(this.buttonGroup)
                .setButtonText(t('modal_camera_start'))
                .onClick(() => this.captureNext())
                .setCta();
                
            new ButtonComponent(this.buttonGroup)
                .setButtonText(t('modal_cancel'))
                .onClick(() => this.close());
        } else {
            new ButtonComponent(this.buttonGroup)
                .setButtonText(t('modal_camera_retake'))
                .onClick(() => {
                    this.capturedPhotos.pop();
                    this.captureNext();
                })
                .setWarning();

            new ButtonComponent(this.buttonGroup)
                .setButtonText(t('modal_camera_continue'))
                .onClick(() => this.captureNext())
                .setCta();

            new ButtonComponent(this.buttonGroup)
                .setButtonText(t('modal_confirm'))
                .onClick(async () => {
                    await this.finishAndInsert();
                    this.close();
                });

            new ButtonComponent(this.buttonGroup)
                .setButtonText(t('modal_cancel'))
                .onClick(() => this.close());
        }
    }

    async captureNext() {
        if (this.isCapturing) return;
        this.isCapturing = true;

        return new Promise<void>((resolve) => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.capture = 'environment';
            
            input.onchange = async (e: Event) => {
                const target = e.target as HTMLInputElement;
                const files = target.files;
                
                if (!files || files.length === 0) {
                    this.isCapturing = false;
                    resolve();
                    return;
                }

                const file = files[0];
                this.capturedPhotos.push(file);
                
                new Notice(t('modal_camera_captured', { count: this.capturedPhotos.length }));
                
                this.isCapturing = false;
                this.updateUI();
                resolve();
            };

            input.onclick = () => {
                setTimeout(() => {
                    if (this.isCapturing) {
                        this.isCapturing = false;
                        this.updateUI();
                        resolve();
                    }
                }, 500);
            };

            input.click();
        });
    }

    async finishAndInsert() {
        if (this.capturedPhotos.length === 0) {
            new Notice(t('modal_camera_no_photos'));
            return;
        }

        this.plugin.showNotice(t('notice_saving_photos'), this.plugin.settings.showSavingNotice);

        let successCount = 0;
        
        for (let i = 0; i < this.capturedPhotos.length; i++) {
            const file = this.capturedPhotos[i];
            const success = await this.plugin.processFileMobile(file, true);
            if (success) successCount++;
        }

        this.plugin.showNotice(t('modal_camera_success', { count: successCount }), this.plugin.settings.showInsertNotice);
    }
}
