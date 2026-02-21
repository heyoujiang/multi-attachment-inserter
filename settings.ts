/**
 * 设置管理模块
 */

import { App, PluginSettingTab, Setting, Platform } from 'obsidian';
import { t } from './i18n';
import type { MobileAttachmentInserterSettings } from './types';
import type MobileAttachmentInserter from './main';

const PLUGIN_VERSION = '0.1.0';
const PLUGIN_AUTHOR = 'heyoujiang';

export class MobileAttachmentInserterSettingTab extends PluginSettingTab {
    plugin: MobileAttachmentInserter;

    constructor(app: App, plugin: MobileAttachmentInserter) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;
        containerEl.empty();

        containerEl.createEl('h2', { text: t('settings_title') });

        // 照片保存路径设置
        new Setting(containerEl)
            .setName(t('settings_camera_save_path'))
            .setDesc(t('settings_camera_save_path_desc'))
            .addText(text => text
                .setPlaceholder('例如 attachments')
                .setValue(this.plugin.settings.cameraSavePath)
                .onChange(async (value) => {
                    this.plugin.settings.cameraSavePath = value;
                    await this.plugin.saveData(this.plugin.settings);
                }));

        // 默认目录设置
        new Setting(containerEl)
            .setName(t('settings_default_picker_path'))
            .setDesc(t('settings_default_picker_path_desc'))
            .addText(text => text
                .setPlaceholder('')
                .setValue(this.plugin.settings.defaultPickerPath)
                .onChange(async (value) => {
                    this.plugin.settings.defaultPickerPath = value;
                    await this.plugin.saveData(this.plugin.settings);
                }));

        // 文件大小限制设置
        new Setting(containerEl)
            .setName(t('settings_file_size_limit'))
            .setDesc(t('settings_file_size_limit_desc'))
            .addText(text => text
                .setPlaceholder('0')
                .setValue(this.plugin.settings.maxFileSize > 0 ? this.plugin.settings.maxFileSize.toString() : '')
                .onChange(async (value) => {
                    const numValue = parseFloat(value) || 0;
                    this.plugin.settings.maxFileSize = numValue;
                    await this.plugin.saveData(this.plugin.settings);
                }));

        // 移动端：保存到相册设置
        if (Platform.isMobile) {
            new Setting(containerEl)
                .setName(t('settings_save_to_gallery'))
                .setDesc(t('settings_save_to_gallery_desc'))
                .addToggle(toggle => toggle
                    .setValue(this.plugin.settings.saveToGallery)
                    .onChange(async (value) => {
                        this.plugin.settings.saveToGallery = value;
                        await this.plugin.saveData(this.plugin.settings);
                    }));

            new Setting(containerEl)
                .setName(t('settings_show_gallery_notice'))
                .setDesc(t('settings_show_gallery_notice_desc'))
                .addToggle(toggle => toggle
                    .setValue(this.plugin.settings.showGalleryNotice)
                    .onChange(async (value) => {
                        this.plugin.settings.showGalleryNotice = value;
                        await this.plugin.saveData(this.plugin.settings);
                    }));
        }

        // 工具栏按钮设置
        containerEl.createEl('h3', { text: t('settings_toolbar_title') });

        new Setting(containerEl)
            .setName(t('settings_show_attach_button'))
            .setDesc(t('settings_show_attach_button_desc'))
            .addToggle(toggle => toggle
                .setValue(this.plugin.settings.showToolbarAttachButton)
                .onChange(async (value) => {
                    this.plugin.settings.showToolbarAttachButton = value;
                    await this.plugin.saveData(this.plugin.settings);
                    window.dispatchEvent(new Event('resize'));
                }));

        if (Platform.isMobile) {
            new Setting(containerEl)
                .setName(t('settings_show_camera_button'))
                .setDesc(t('settings_show_camera_button_desc'))
                .addToggle(toggle => toggle
                    .setValue(this.plugin.settings.showToolbarCameraButton)
                    .onChange(async (value) => {
                        this.plugin.settings.showToolbarCameraButton = value;
                        await this.plugin.saveData(this.plugin.settings);
                        window.dispatchEvent(new Event('resize'));
                    }));
        }

        // 提示信息设置
        containerEl.createEl('h3', { text: t('settings_notice_title') });

        new Setting(containerEl)
            .setName(t('settings_show_saving_notice'))
            .setDesc(t('settings_show_saving_notice_desc'))
            .addToggle(toggle => toggle
                .setValue(this.plugin.settings.showSavingNotice)
                .onChange(async (value) => {
                    this.plugin.settings.showSavingNotice = value;
                    await this.plugin.saveData(this.plugin.settings);
                }));

        new Setting(containerEl)
            .setName(t('settings_show_insert_notice'))
            .setDesc(t('settings_show_insert_notice_desc'))
            .addToggle(toggle => toggle
                .setValue(this.plugin.settings.showInsertNotice)
                .onChange(async (value) => {
                    this.plugin.settings.showInsertNotice = value;
                    await this.plugin.saveData(this.plugin.settings);
                }));

        // 插件信息
        containerEl.createEl('hr', { cls: 'settings-divider' });
        
        const aboutDiv = containerEl.createDiv({ cls: 'settings-about' });
        aboutDiv.createEl('p', { text: `${t('settings_version')}: ${PLUGIN_VERSION}` });
        aboutDiv.createEl('p', { text: `${t('settings_author')}: ${PLUGIN_AUTHOR}` });
        
        let platformText = 'Desktop';
        if (Platform.isMobileApp) {
            platformText = Platform.isIosApp ? 'iOS' : (Platform.isAndroidApp ? 'Android' : 'Mobile');
        } else if (Platform.isDesktop) {
            platformText = Platform.isMacOS ? 'macOS' : (Platform.isLinux ? 'Linux' : 'Windows');
        }
        
        aboutDiv.createEl('p', { text: `${t('settings_platform')}: ${platformText}` });
    }
}
