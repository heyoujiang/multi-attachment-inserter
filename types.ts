/**
 * 类型定义模块
 */

export interface MobileAttachmentInserterSettings {
    /** 默认文件选择器路径（仅部分 Android 设备支持） */
    defaultPickerPath: string;
    /** 照片保存路径（相对于 vault 根目录） */
    cameraSavePath: string;
    /** 是否在拍照后将照片保存到系统相册 */
    saveToGallery: boolean;
    /** 保存到相册时是否显示提示信息 */
    showGalleryNotice: boolean;
    /** 是否在工具栏显示插入附件按钮 */
    showToolbarAttachButton: boolean;
    /** 是否在工具栏显示拍照按钮 */
    showToolbarCameraButton: boolean;
    /** 是否显示保存照片提示 */
    showSavingNotice: boolean;
    /** 是否显示插入成功提示 */
    showInsertNotice: boolean;
    /** 单个文件大小限制（单位：MB），0 或留空表示不限制 */
    maxFileSize: number;
}

export const DEFAULT_SETTINGS: MobileAttachmentInserterSettings = {
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

// 平台类型
export type PlatformType = 'mobile' | 'desktop';

// 文件处理结果
export interface FileProcessResult {
    success: boolean;
    filePath?: string;
    error?: string;
    skipped?: boolean;
    skipReason?: string;
}
