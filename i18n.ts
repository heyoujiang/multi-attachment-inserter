/**
 * 国际化模块
 */

type TranslationKey = 
    | 'ribbon_insert_attachments'
    | 'ribbon_take_photo'
    | 'command_insert_attachments'
    | 'command_take_photo'
    | 'notice_mobile_only'
    | 'notice_desktop_only'
    | 'notice_processing_files'
    | 'notice_insert_success'
    | 'notice_no_editor'
    | 'notice_folder_error'
    | 'notice_process_error'
    | 'notice_saved_to_gallery'
    | 'notice_gallery_limited'
    | 'notice_gallery_permission_required'
    | 'notice_saving_photos'
    | 'notice_inserting_photos'
    | 'notice_file_too_large'
    | 'notice_file_type_not_allowed'
    | 'modal_camera_title'
    | 'modal_camera_ready'
    | 'modal_camera_count'
    | 'modal_camera_start'
    | 'modal_camera_retake'
    | 'modal_camera_continue'
    | 'modal_camera_captured'
    | 'modal_camera_no_photos'
    | 'modal_camera_saving'
    | 'modal_camera_success'
    | 'modal_confirm'
    | 'modal_cancel'
    | 'settings_title'
    | 'settings_camera_save_path'
    | 'settings_camera_save_path_desc'
    | 'settings_default_picker_path'
    | 'settings_default_picker_path_desc'
    | 'settings_save_to_gallery'
    | 'settings_save_to_gallery_desc'
    | 'settings_show_gallery_notice'
    | 'settings_show_gallery_notice_desc'
    | 'settings_toolbar_title'
    | 'settings_show_attach_button'
    | 'settings_show_attach_button_desc'
    | 'settings_show_camera_button'
    | 'settings_show_camera_button_desc'
    | 'settings_notice_title'
    | 'settings_show_saving_notice'
    | 'settings_show_saving_notice_desc'
    | 'settings_show_insert_notice'
    | 'settings_show_insert_notice_desc'
    | 'settings_file_size_limit'
    | 'settings_file_size_limit_desc'
    | 'settings_version'
    | 'settings_platform'
    | 'settings_author';

const translations: Record<string, Record<TranslationKey, string>> = {
    'zh': {
        ribbon_insert_attachments: '插入多个附件',
        ribbon_take_photo: '拍照并插入',
        command_insert_attachments: '插入多个附件',
        command_take_photo: '拍照并插入',
        notice_mobile_only: '此功能仅支持移动端 App',
        notice_desktop_only: '此功能在桌面端不可用',
        notice_processing_files: '正在处理 {count} 个文件...',
        notice_insert_success: '成功插入 {count} 个文件',
        notice_no_editor: '未找到活动编辑器，链接已复制到剪贴板',
        notice_folder_error: '无法创建目标文件夹',
        notice_process_error: '处理文件失败: {error}',
        notice_saved_to_gallery: '已保存到系统相册',
        notice_gallery_limited: '已插入笔记，保存到相册需要更多权限',
        notice_gallery_permission_required: '需要存储权限才能保存到相册',
        notice_saving_photos: '正在保存照片...',
        notice_inserting_photos: '正在插入照片...',
        notice_file_too_large: '文件 {name} 超过大小限制 ({size}MB)，已跳过',
        notice_file_type_not_allowed: '文件 {name} 类型不允许，已跳过',
        modal_camera_title: '拍摄照片',
        modal_camera_ready: '准备拍摄...',
        modal_camera_count: '已拍摄: {count} 张',
        modal_camera_start: '开始拍摄',
        modal_camera_retake: '重拍',
        modal_camera_continue: '继续拍下一张',
        modal_camera_captured: '已拍摄 {count} 张',
        modal_camera_no_photos: '没有拍摄任何照片',
        modal_camera_saving: '正在保存 {count} 张照片...',
        modal_camera_success: '已插入 {count} 张照片',
        modal_confirm: '确定',
        modal_cancel: '取消',
        settings_title: '附件插入器设置',
        settings_camera_save_path: '照片保存路径',
        settings_camera_save_path_desc: '相机照片在 vault 中的存放路径（相对于 vault 根目录）。留空则使用 Obsidian 设置的附件文件夹。',
        settings_default_picker_path: '默认文件选择目录',
        settings_default_picker_path_desc: '文件选择器初始路径（仅部分 Android 设备支持）',
        settings_save_to_gallery: '保存到系统相册',
        settings_save_to_gallery_desc: '拍照后将照片同时保存到手机相册（需要存储权限）',
        settings_show_gallery_notice: '显示保存到相册提示',
        settings_show_gallery_notice_desc: '保存照片到系统相册时显示提示信息',
        settings_toolbar_title: '工具栏按钮设置',
        settings_show_attach_button: '显示插入附件按钮',
        settings_show_attach_button_desc: '在编辑器工具栏显示插入附件按钮',
        settings_show_camera_button: '显示拍照按钮',
        settings_show_camera_button_desc: '在编辑器工具栏显示拍照按钮',
        settings_notice_title: '提示信息设置',
        settings_show_saving_notice: '显示保存照片提示',
        settings_show_saving_notice_desc: '保存照片时显示提示信息',
        settings_show_insert_notice: '显示插入成功提示',
        settings_show_insert_notice_desc: '插入照片成功后显示提示信息',
        settings_file_size_limit: '文件大小限制 (MB)',
        settings_file_size_limit_desc: '单个文件大小限制（0 或留空表示不限制）',
        settings_version: '版本',
        settings_platform: '支持平台',
        settings_author: '作者',
    },
    
    'en': {
        ribbon_insert_attachments: 'Insert Multiple Attachments',
        ribbon_take_photo: 'Take Photo & Insert',
        command_insert_attachments: 'Insert Multiple Attachments',
        command_take_photo: 'Take Photo & Insert',
        notice_mobile_only: 'This feature is only available on the mobile app',
        notice_desktop_only: 'This feature is not available on desktop',
        notice_processing_files: 'Processing {count} files...',
        notice_insert_success: 'Successfully inserted {count} files',
        notice_no_editor: 'No active editor found, link copied to clipboard',
        notice_folder_error: 'Failed to create target folder',
        notice_process_error: 'Failed to process file: {error}',
        notice_saved_to_gallery: 'Saved to system gallery',
        notice_gallery_limited: 'Inserted to note, gallery save requires more permissions',
        notice_gallery_permission_required: 'Storage permission required to save to gallery',
        notice_saving_photos: 'Saving photos...',
        notice_inserting_photos: 'Inserting photos...',
        notice_file_too_large: 'File {name} exceeds size limit ({size}MB), skipped',
        notice_file_type_not_allowed: 'File {name} type not allowed, skipped',
        modal_camera_title: 'Take Photo',
        modal_camera_ready: 'Ready to capture...',
        modal_camera_count: 'Captured: {count} photos',
        modal_camera_start: 'Start Capture',
        modal_camera_retake: 'Retake',
        modal_camera_continue: 'Take Another',
        modal_camera_captured: '{count} photos captured',
        modal_camera_no_photos: 'No photos taken',
        modal_camera_saving: 'Saving {count} photos...',
        modal_camera_success: '{count} photos inserted',
        modal_confirm: 'Confirm',
        modal_cancel: 'Cancel',
        settings_title: 'Attachment Inserter Settings',
        settings_camera_save_path: 'Photo Save Path',
        settings_camera_save_path_desc: 'The path where camera photos are saved in the vault (relative to vault root). Leave empty to use Obsidian\'s attachment folder setting.',
        settings_default_picker_path: 'Default Picker Directory',
        settings_default_picker_path_desc: 'Initial path for file picker (only supported on some Android devices)',
        settings_save_to_gallery: 'Save to Gallery',
        settings_save_to_gallery_desc: 'Also save photos to the system gallery after capturing (requires storage permission)',
        settings_show_gallery_notice: 'Show Gallery Notice',
        settings_show_gallery_notice_desc: 'Show notification when saving photos to system gallery',
        settings_toolbar_title: 'Toolbar Button Settings',
        settings_show_attach_button: 'Show Attach Button',
        settings_show_attach_button_desc: 'Show insert attachments button in editor toolbar',
        settings_show_camera_button: 'Show Camera Button',
        settings_show_camera_button_desc: 'Show camera button in editor toolbar',
        settings_notice_title: 'Notice Settings',
        settings_show_saving_notice: 'Show Saving Notice',
        settings_show_saving_notice_desc: 'Show notification when saving photos',
        settings_show_insert_notice: 'Show Insert Notice',
        settings_show_insert_notice_desc: 'Show notification when photos are inserted successfully',
        settings_file_size_limit: 'File Size Limit (MB)',
        settings_file_size_limit_desc: 'Maximum file size limit (0 or empty means no limit)',
        settings_version: 'Version',
        settings_platform: 'Supported Platforms',
        settings_author: 'Author',
    },

    'ja': {
        ribbon_insert_attachments: '複数の添付ファイルを挿入',
        ribbon_take_photo: '写真を撮って挿入',
        command_insert_attachments: '複数の添付ファイルを挿入',
        command_take_photo: '写真を撮って挿入',
        notice_mobile_only: 'この機能はモバイルアプリでのみ利用可能です',
        notice_desktop_only: 'この機能はデスクトップでは利用できません',
        notice_processing_files: '{count} 個のファイルを処理中...',
        notice_insert_success: '{count} 個のファイルを正常に挿入しました',
        notice_no_editor: 'アクティブなエディターが見つかりません。リンクはクリップボードにコピーされました。',
        notice_folder_error: 'ターゲットフォルダーを作成できません',
        notice_process_error: 'ファイルの処理に失敗しました: {error}',
        notice_saved_to_gallery: 'システムギャラリーに保存しました',
        notice_gallery_limited: 'ノートに挿入しました。ギャラリーへの保存には追加の権限が必要です',
        notice_gallery_permission_required: 'ギャラリーに保存するにはストレージ権限が必要です',
        notice_saving_photos: '写真を保存中...',
        notice_inserting_photos: '写真を挿入中...',
        notice_file_too_large: 'ファイル {name} がサイズ制限 ({size}MB) を超えています',
        notice_file_type_not_allowed: 'ファイル {name} の種類が許可されていません',
        modal_camera_title: '写真を撮る',
        modal_camera_ready: '撮影準備完了...',
        modal_camera_count: '撮影済み: {count} 枚',
        modal_camera_start: '撮影開始',
        modal_camera_retake: '撮り直し',
        modal_camera_continue: '続けて撮影',
        modal_camera_captured: '{count} 枚撮影しました',
        modal_camera_no_photos: '写真が撮影されていません',
        modal_camera_saving: '{count} 枚の写真保存中...',
        modal_camera_success: '{count} 枚の写真を送信しました',
        modal_confirm: '確認',
        modal_cancel: 'キャンセル',
        settings_title: '添付ファイル挿入器設定',
        settings_camera_save_path: '写真の保存パス',
        settings_camera_save_path_desc: 'カメラ写真の保管場所（vault ルートからの相対パス）。空の場合、Obsidian の添付ファイル設定を使用します。',
        settings_default_picker_path: 'デフォルトピッカーディレクトリ',
        settings_default_picker_path_desc: 'ファイルピッカーの初期パス（一部の Android デバイスのみサポート）',
        settings_save_to_gallery: 'ギャラリーに保存',
        settings_save_to_gallery_desc: '撮影後に写真をシステムのギャラリーにも保存します（ストレージ権限が必要）',
        settings_show_gallery_notice: 'ギャラリー通知を表示',
        settings_show_gallery_notice_desc: '写真をシステムギャラリーに保存する際に通知を表示',
        settings_toolbar_title: 'ツールバーボタン設定',
        settings_show_attach_button: '添付ファイルボタンを表示',
        settings_show_attach_button_desc: 'エディターツールバーに添付ファイルボタンを表示',
        settings_show_camera_button: 'カメラボタンを表示',
        settings_show_camera_button_desc: 'エディターツールバーにカメラボタンを表示',
        settings_notice_title: '通知設定',
        settings_show_saving_notice: '保存通知を表示',
        settings_show_saving_notice_desc: '写真を保存する際に通知を表示',
        settings_show_insert_notice: '挿入通知を表示',
        settings_show_insert_notice_desc: '写真が正常に挿入された際に通知を表示',
        settings_file_size_limit: 'ファイルサイズ制限 (MB)',
        settings_file_size_limit_desc: '最大ファイルサイズ（0または空は無制限）',
        settings_version: 'バージョン',
        settings_platform: '対応プラットフォーム',
        settings_author: '作者',
    },

    'ko': {
        ribbon_insert_attachments: '여러 첨부 파일 삽입',
        ribbon_take_photo: '사진 촬영 및 삽입',
        command_insert_attachments: '여러 첨부 파일 삽입',
        command_take_photo: '사진 촬영 및 삽입',
        notice_mobile_only: '이 기능은 모바일 앱에서만 사용 가능합니다',
        notice_desktop_only: '이 기능은 데스크톱에서 사용할 수 없습니다',
        notice_processing_files: '{count}개 파일 처리 중...',
        notice_insert_success: '{count}개 파일이 성공적으로 삽입되었습니다',
        notice_no_editor: '활성 편집기를 찾을 수 없습니다. 링크가 클립보드에 복사되었습니다.',
        notice_folder_error: '대상 폴더를 만들 수 없습니다',
        notice_process_error: '파일 처리 실패: {error}',
        notice_saved_to_gallery: '시스템 갤러리에 저장되었습니다',
        notice_gallery_limited: '노트에 삽입되었습니다. 갤러리 저장은 추가 권한이 필요합니다',
        notice_gallery_permission_required: '갤러리에 저장하려면 저장소 권한이 필요합니다',
        notice_saving_photos: '사진 저장 중...',
        notice_inserting_photos: '사진 삽입 중...',
        notice_file_too_large: '파일 {name}이(가) 크기 제한({size}MB)을 초과하여 건너뜀',
        notice_file_type_not_allowed: '파일 {name} 유형이 허용되지 않아 건너뜀',
        modal_camera_title: '사진 촬영',
        modal_camera_ready: '촬영 준비 완료...',
        modal_camera_count: '촬영 완료: {count}장',
        modal_camera_start: '촬영 시작',
        modal_camera_retake: '다시 촬영',
        modal_camera_continue: '계속 촬영',
        modal_camera_captured: '{count}장 촬영됨',
        modal_camera_no_photos: '촬영된 사진이 없습니다',
        modal_camera_saving: '{count}장 사진 저장 중...',
        modal_camera_success: '{count}장 사진 삽입 완료',
        modal_confirm: '확인',
        modal_cancel: '취소',
        settings_title: '첨부 파일 삽입기 설정',
        settings_camera_save_path: '사진 저장 경로',
        settings_camera_save_path_desc: '카메라 사진이 볼트에 저장될 경로(볼트 루트 기준). 비어 있으면 Obsidian 첨부 파일 설정을 사용합니다.',
        settings_default_picker_path: '기본 선택기 디렉토리',
        settings_default_picker_path_desc: '파일 선택기의 초기 경로(일부 Android 기기만 지원)',
        settings_save_to_gallery: '갤러리에 저장',
        settings_save_to_gallery_desc: '촬영 후 사진을 시스템 갤러리에도 저장합니다(저장소 권한 필요)',
        settings_show_gallery_notice: '갤러리 알림 표시',
        settings_show_gallery_notice_desc: '시스템 갤러리에 사진 저장 시 알림 표시',
        settings_toolbar_title: '도구 모음 버튼 설정',
        settings_show_attach_button: '첨부 파일 버튼 표시',
        settings_show_attach_button_desc: '편집기 도구 모음에 첨부 파일 버튼 표시',
        settings_show_camera_button: '카메라 버튼 표시',
        settings_show_camera_button_desc: '편집기 도구 모음에 카메라 버튼 표시',
        settings_notice_title: '알림 설정',
        settings_show_saving_notice: '저장 알림 표시',
        settings_show_saving_notice_desc: '사진 저장 시 알림 표시',
        settings_show_insert_notice: '삽입 알림 표시',
        settings_show_insert_notice_desc: '사진이 성공적으로 삽입된 후 알림 표시',
        settings_file_size_limit: '파일 크기 제한 (MB)',
        settings_file_size_limit_desc: '최대 파일 크기 제한 (0 또는 비워두면 무제한)',
        settings_version: '버전',
        settings_platform: '지원 플랫폼',
        settings_author: '작성자',
    },

    'fr': {
        ribbon_insert_attachments: 'Insérer plusieurs pièces jointes',
        ribbon_take_photo: 'Prendre une photo et insérer',
        command_insert_attachments: 'Insérer plusieurs pièces jointes',
        command_take_photo: 'Prendre une photo et insérer',
        notice_mobile_only: 'Cette fonctionnalité est uniquement disponible sur l\'application mobile',
        notice_desktop_only: 'Cette fonctionnalité n\'est pas disponible sur ordinateur',
        notice_processing_files: 'Traitement de {count} fichiers...',
        notice_insert_success: '{count} fichiers insérés avec succès',
        notice_no_editor: 'Aucun éditeur actif trouvé, lien copié dans le presse-papiers',
        notice_folder_error: 'Impossible de créer le dossier cible',
        notice_process_error: 'Échec du traitement du fichier: {error}',
        notice_saved_to_gallery: 'Enregistré dans la galerie système',
        notice_gallery_limited: 'Inséré dans la note, l\'enregistrement dans la galerie nécessite plus de permissions',
        notice_gallery_permission_required: 'Permission de stockage requise pour enregistrer dans la galerie',
        notice_saving_photos: 'Enregistrement des photos...',
        notice_inserting_photos: 'Insertion des photos...',
        notice_file_too_large: 'Fichier {name} dépasse la limite de taille ({size}MB), ignoré',
        notice_file_type_not_allowed: 'Type de fichier {name} non autorisé, ignoré',
        modal_camera_title: 'Prendre une photo',
        modal_camera_ready: 'Prêt à capturer...',
        modal_camera_count: 'Capturé: {count} photos',
        modal_camera_start: 'Démarrer la capture',
        modal_camera_retake: 'Reprendre',
        modal_camera_continue: 'Continuer',
        modal_camera_captured: '{count} photos capturées',
        modal_camera_no_photos: 'Aucune photo prise',
        modal_camera_saving: 'Enregistrement de {count} photos...',
        modal_camera_success: '{count} photos insérées',
        modal_confirm: 'Confirmer',
        modal_cancel: 'Annuler',
        settings_title: 'Paramètres de l\'inserteur de pièces jointes',
        settings_camera_save_path: 'Chemin de sauvegarde des photos',
        settings_camera_save_path_desc: 'Le chemin où les photos de la caméra sont enregistrées dans le coffre (relatif à la racine du coffre). Laissez vide pour utiliser le paramètre de dossier de pièces jointes d\'Obsidian.',
        settings_default_picker_path: 'Répertoire du sélecteur par défaut',
        settings_default_picker_path_desc: 'Chemin initial du sélecteur de fichiers (pris en charge uniquement sur certains appareils Android)',
        settings_save_to_gallery: 'Enregistrer dans la galerie',
        settings_save_to_gallery_desc: 'Enregistrer également les photos dans la galerie système après la capture (nécessite l\'autorisation de stockage)',
        settings_show_gallery_notice: 'Afficher la notification de galerie',
        settings_show_gallery_notice_desc: 'Afficher la notification lors de l\'enregistrement des photos dans la galerie système',
        settings_toolbar_title: 'Paramètres des boutons de la barre d\'outils',
        settings_show_attach_button: 'Afficher le bouton de pièce jointe',
        settings_show_attach_button_desc: 'Afficher le bouton d\'insertion de pièces jointes dans la barre d\'outils de l\'éditeur',
        settings_show_camera_button: 'Afficher le bouton caméra',
        settings_show_camera_button_desc: 'Afficher le bouton caméra dans la barre d\'outils de l\'éditeur',
        settings_notice_title: 'Paramètres de notification',
        settings_show_saving_notice: 'Afficher la notification de sauvegarde',
        settings_show_saving_notice_desc: 'Afficher la notification lors de l\'enregistrement des photos',
        settings_show_insert_notice: 'Afficher la notification d\'insertion',
        settings_show_insert_notice_desc: 'Afficher la notification lorsque les photos sont insérées avec succès',
        settings_file_size_limit: 'Limite de taille de fichier (Mo)',
        settings_file_size_limit_desc: 'Taille maximale du fichier (0 ou vide = sans limite)',
        settings_version: 'Version',
        settings_platform: 'Plateformes prises en charge',
        settings_author: 'Auteur',
    },

    'de': {
        ribbon_insert_attachments: 'Mehrere Anhänge einfügen',
        ribbon_take_photo: 'Foto aufnehmen & einfügen',
        command_insert_attachments: 'Mehrere Anhänge einfügen',
        command_take_photo: 'Foto aufnehmen & einfügen',
        notice_mobile_only: 'Diese Funktion ist nur in der mobilen App verfügbar',
        notice_desktop_only: 'Diese Funktion ist auf dem Desktop nicht verfügbar',
        notice_processing_files: 'Verarbeite {count} Dateien...',
        notice_insert_success: '{count} Dateien erfolgreich eingefügt',
        notice_no_editor: 'Kein aktiver Editor gefunden, Link in Zwischenablage kopiert',
        notice_folder_error: 'Zielordner konnte nicht erstellt werden',
        notice_process_error: 'Dateiverarbeitung fehlgeschlagen: {error}',
        notice_saved_to_gallery: 'In die Systemgalerie gespeichert',
        notice_gallery_limited: 'In die Notiz eingefügt, Galerie-Speicherung erfordert mehr Berechtigungen',
        notice_gallery_permission_required: 'Speicherberechtigung erforderlich, um in die Galerie zu speichern',
        notice_saving_photos: 'Fotos speichern...',
        notice_inserting_photos: 'Fotos einfügen...',
        notice_file_too_large: 'Datei {name} überschreitet Größenlimit ({size}MB), übersprungen',
        notice_file_type_not_allowed: 'Dateityp {name} nicht erlaubt, übersprungen',
        modal_camera_title: 'Foto aufnehmen',
        modal_camera_ready: 'Bereit zur Aufnahme...',
        modal_camera_count: 'Aufgenommen: {count} Fotos',
        modal_camera_start: 'Aufnahme starten',
        modal_camera_retake: 'Erneut aufnehmen',
        modal_camera_continue: 'Weiter aufnehmen',
        modal_camera_captured: '{count} Fotos aufgenommen',
        modal_camera_no_photos: 'Keine Fotos aufgenommen',
        modal_camera_saving: 'Speichere {count} Fotos...',
        modal_camera_success: '{count} Fotos eingefügt',
        modal_confirm: 'Bestätigen',
        modal_cancel: 'Abbrechen',
        settings_title: 'Einstellungen für Anhang-Einfüger',
        settings_camera_save_path: 'Foto-Speicherpfad',
        settings_camera_save_path_desc: 'Der Pfad, wo Kamerabilder im Tresor gespeichert werden (relativ zum Tresor-Stammverzeichnis). Leer lassen, um den Obsidian Anhangsordner-Einstellung zu verwenden.',
        settings_default_picker_path: 'Standard-Auswahlverzeichnis',
        settings_default_picker_path_desc: 'Anfangspfad für den Dateiauswheeler (nur auf einigen Android-Geräten unterstützt)',
        settings_save_to_gallery: 'In Galerie speichern',
        settings_save_to_gallery_desc: 'Fotos nach der Aufnahme auch in der Systemgalerie speichern (erfordert Speicherberechtigung)',
        settings_show_gallery_notice: 'Galerie-Benachrichtigung anzeigen',
        settings_show_gallery_notice_desc: 'Benachrichtigung beim Speichern von Fotos in der Systemgalerie anzeigen',
        settings_toolbar_title: 'Symbolleistenschaltflächen-Einstellungen',
        settings_show_attach_button: 'Anhang-Schaltfläche anzeigen',
        settings_show_attach_button_desc: 'Anhänge einfügen-Schaltfläche in der Editor-Symbolleiste anzeigen',
        settings_show_camera_button: 'Kamera-Schaltfläche anzeigen',
        settings_show_camera_button_desc: 'Kamera-Schaltfläche in der Editor-Symbolleiste anzeigen',
        settings_notice_title: 'Benachrichtigungseinstellungen',
        settings_show_saving_notice: 'Speicherbenachrichtigung anzeigen',
        settings_show_saving_notice_desc: 'Benachrichtigung beim Speichern von Fotos anzeigen',
        settings_show_insert_notice: 'Einfügebenachrichtigung anzeigen',
        settings_show_insert_notice_desc: 'Benachrichtigung anzeigen, wenn Fotos erfolgreich eingefügt wurden',
        settings_file_size_limit: 'Dateigrößenlimit (MB)',
        settings_file_size_limit_desc: 'Maximale Dateigröße (0 oder leer = kein Limit)',
        settings_version: 'Version',
        settings_platform: 'Unterstützte Plattformen',
        settings_author: 'Autor',
    },

    'es': {
        ribbon_insert_attachments: 'Insertar múltiples archivos adjuntos',
        ribbon_take_photo: 'Tomar foto e insertar',
        command_insert_attachments: 'Insertar múltiples archivos adjuntos',
        command_take_photo: 'Tomar foto e insertar',
        notice_mobile_only: 'Esta función solo está disponible en la aplicación móvil',
        notice_desktop_only: 'Esta función no está disponible en el escritorio',
        notice_processing_files: 'Procesando {count} archivos...',
        notice_insert_success: '{count} archivos insertados exitosamente',
        notice_no_editor: 'No se encontró editor activo, enlace copiado al portapapeles',
        notice_folder_error: 'No se pudo crear la carpeta de destino',
        notice_process_error: 'Error al procesar el archivo: {error}',
        notice_saved_to_gallery: 'Guardado en la galería del sistema',
        notice_gallery_limited: 'Insertado en la nota, guardar en la galería requiere más permisos',
        notice_gallery_permission_required: 'Se requiere permiso de almacenamiento para guardar en la galería',
        notice_saving_photos: 'Guardando fotos...',
        notice_inserting_photos: 'Insertando fotos...',
        notice_file_too_large: 'Archivo {name} excede el límite de tamaño ({size}MB), omitido',
        notice_file_type_not_allowed: 'Tipo de archivo {name} no permitido, omitido',
        modal_camera_title: 'Tomar foto',
        modal_camera_ready: 'Listo para capturar...',
        modal_camera_count: 'Capturado: {count} fotos',
        modal_camera_start: 'Iniciar captura',
        modal_camera_retake: 'Volver a tomar',
        modal_camera_continue: 'Continuar tomando',
        modal_camera_captured: '{count} fotos capturadas',
        modal_camera_no_photos: 'No se tomó ninguna foto',
        modal_camera_saving: 'Guardando {count} fotos...',
        modal_camera_success: '{count} fotos insertadas',
        modal_confirm: 'Confirmar',
        modal_cancel: 'Cancelar',
        settings_title: 'Configuración del insertador de archivos adjuntos',
        settings_camera_save_path: 'Ruta de guardado de fotos',
        settings_camera_save_path_desc: 'La ruta donde se guardan las fotos de la cámara en la bóveda (relativa a la raíz de la bóveda). Dejar vacío para usar la configuración de carpeta de archivos adjuntos de Obsidian.',
        settings_default_picker_path: 'Directorio del selector predeterminado',
        settings_default_picker_path_desc: 'Ruta inicial del selector de archivos (solo compatible con algunos dispositivos Android)',
        settings_save_to_gallery: 'Guardar en galería',
        settings_save_to_gallery_desc: 'Guardar también las fotos en la galería del sistema después de capturar (requiere permiso de almacenamiento)',
        settings_show_gallery_notice: 'Mostrar notificación de galería',
        settings_show_gallery_notice_desc: 'Mostrar notificación al guardar fotos en la galería del sistema',
        settings_toolbar_title: 'Configuración de botones de barra de herramientas',
        settings_show_attach_button: 'Mostrar botón de adjunto',
        settings_show_attach_button_desc: 'Mostrar botón de insertar archivos adjuntos en la barra de herramientas del editor',
        settings_show_camera_button: 'Mostrar botón de cámara',
        settings_show_camera_button_desc: 'Mostrar botón de cámara en la barra de herramientas del editor',
        settings_notice_title: 'Configuración de notificaciones',
        settings_show_saving_notice: 'Mostrar notificación de guardado',
        settings_show_saving_notice_desc: 'Mostrar notificación al guardar fotos',
        settings_show_insert_notice: 'Mostrar notificación de inserción',
        settings_show_insert_notice_desc: 'Mostrar notificación cuando las fotos se insertan exitosamente',
        settings_file_size_limit: 'Límite de tamaño de archivo (MB)',
        settings_file_size_limit_desc: 'Tamaño máximo del archivo (0 o vacío = sin límite)',
        settings_version: 'Versión',
        settings_platform: 'Plataformas compatibles',
        settings_author: 'Autor',
    },

    'pt': {
        ribbon_insert_attachments: 'Inserir múltiplos anexos',
        ribbon_take_photo: 'Tirar foto e inserir',
        command_insert_attachments: 'Inserir múltiplos anexos',
        command_take_photo: 'Tirar foto e inserir',
        notice_mobile_only: 'Este recurso está disponível apenas no aplicativo móvel',
        notice_desktop_only: 'Este recurso não está disponível no desktop',
        notice_processing_files: 'Processando {count} arquivos...',
        notice_insert_success: '{count} arquivos inseridos com sucesso',
        notice_no_editor: 'Nenhum editor ativo encontrado, link copiado para a área de transferência',
        notice_folder_error: 'Não foi possível criar a pasta de destino',
        notice_process_error: 'Falha ao processar o arquivo: {error}',
        notice_saved_to_gallery: 'Salvo na galeria do sistema',
        notice_gallery_limited: 'Inserido na nota, salvar na galeria requer mais permissões',
        notice_gallery_permission_required: 'Permissão de armazenamento necessária para salvar na galeria',
        notice_saving_photos: 'Salvando fotos...',
        notice_inserting_photos: 'Inserindo fotos...',
        notice_file_too_large: 'Arquivo {name} excede o limite de tamanho ({size}MB), ignorado',
        notice_file_type_not_allowed: 'Tipo de arquivo {name} não permitido, ignorado',
        modal_camera_title: 'Tirar foto',
        modal_camera_ready: 'Pronto para capturar...',
        modal_camera_count: 'Capturado: {count} fotos',
        modal_camera_start: 'Iniciar captura',
        modal_camera_retake: 'Tirar novamente',
        modal_camera_continue: 'Continuar tirando',
        modal_camera_captured: '{count} fotos capturadas',
        modal_camera_no_photos: 'Nenhuma foto tirada',
        modal_camera_saving: 'Salvando {count} fotos...',
        modal_camera_success: '{count} fotos inseridas',
        modal_confirm: 'Confirmar',
        modal_cancel: 'Cancelar',
        settings_title: 'Configurações do inseridor de anexos',
        settings_camera_save_path: 'Caminho de salvamento de fotos',
        settings_camera_save_path_desc: 'O caminho onde as fotos da câmera são salvas no cofre (relativo à raiz do cofre). Deixe vazio para usar a configuração de pasta de anexos do Obsidian.',
        settings_default_picker_path: 'Diretório do seletor padrão',
        settings_default_picker_path_desc: 'Caminho inicial do seletor de arquivos (suportado apenas em alguns dispositivos Android)',
        settings_save_to_gallery: 'Salvar na galeria',
        settings_save_to_gallery_desc: 'Salvar também as fotos na galeria do sistema após capturar (requer permissão de armazenamento)',
        settings_show_gallery_notice: 'Mostrar notificação da galeria',
        settings_show_gallery_notice_desc: 'Mostrar notificação ao salvar fotos na galeria do sistema',
        settings_toolbar_title: 'Configurações dos botões da barra de ferramentas',
        settings_show_attach_button: 'Mostrar botão de anexo',
        settings_show_attach_button_desc: 'Mostrar botão de inserir anexos na barra de ferramentas do editor',
        settings_show_camera_button: 'Mostrar botão de câmera',
        settings_show_camera_button_desc: 'Mostrar botão de câmera na barra de ferramentas do editor',
        settings_notice_title: 'Configurações de notificação',
        settings_show_saving_notice: 'Mostrar notificação de salvamento',
        settings_show_saving_notice_desc: 'Mostrar notificação ao salvar fotos',
        settings_show_insert_notice: 'Mostrar notificação de inserção',
        settings_show_insert_notice_desc: 'Mostrar notificação quando as fotos são inseridas com sucesso',
        settings_file_size_limit: 'Limite de tamanho do arquivo (MB)',
        settings_file_size_limit_desc: 'Tamanho máximo do arquivo (0 ou vazio = sem limite)',
        settings_version: 'Versão',
        settings_platform: 'Plataformas suportadas',
        settings_author: 'Autor',
    },

    'ru': {
        ribbon_insert_attachments: 'Вставить несколько вложений',
        ribbon_take_photo: 'Сделать фото и вставить',
        command_insert_attachments: 'Вставить несколько вложений',
        command_take_photo: 'Сделать фото и вставить',
        notice_mobile_only: 'Эта функция доступна только в мобильном приложении',
        notice_desktop_only: 'Эта функция недоступна на компьютере',
        notice_processing_files: 'Обработка {count} файлов...',
        notice_insert_success: '{count} файлов успешно вставлено',
        notice_no_editor: 'Активный редактор не найден, ссылка скопирована в буфер обмена',
        notice_folder_error: 'Не удалось создать целевую папку',
        notice_process_error: 'Ошибка обработки файла: {error}',
        notice_saved_to_gallery: 'Сохранено в системную галерею',
        notice_gallery_limited: 'Вставлено в заметку, для сохранения в галерею требуются дополнительные разрешения',
        notice_gallery_permission_required: 'Для сохранения в галерею требуется разрешение на хранилище',
        notice_saving_photos: 'Сохранение фотографий...',
        notice_inserting_photos: 'Вставка фотографий...',
        notice_file_too_large: 'Файл {name} превышает ограничение размера ({size}MB), пропущен',
        notice_file_type_not_allowed: 'Тип файла {name} не разрешён, пропущен',
        modal_camera_title: 'Сделать фото',
        modal_camera_ready: 'Готов к съёмке...',
        modal_camera_count: 'Снято: {count} фото',
        modal_camera_start: 'Начать съёмку',
        modal_camera_retake: 'Переснять',
        modal_camera_continue: 'Продолжить съёмку',
        modal_camera_captured: 'Снято {count} фото',
        modal_camera_no_photos: 'Фото не были сделаны',
        modal_camera_saving: 'Сохранение {count} фото...',
        modal_camera_success: '{count} фото вставлено',
        modal_confirm: 'Подтвердить',
        modal_cancel: 'Отмена',
        settings_title: 'Настройки вставщика вложений',
        settings_camera_save_path: 'Путь сохранения фото',
        settings_camera_save_path_desc: 'Путь для сохранения фотографий с камеры в хранилище (относительно корня хранилища). Оставьте пустым, чтобы использовать настройку папки вложений Obsidian.',
        settings_default_picker_path: 'Каталог выбора по умолчанию',
        settings_default_picker_path_desc: 'Начальный путь для выбора файлов (поддерживается только на некоторых устройствах Android)',
        settings_save_to_gallery: 'Сохранять в галерею',
        settings_save_to_gallery_desc: 'Также сохранять фотографии в системную галерею после съёмки (требуется разрешение на хранилище)',
        settings_show_gallery_notice: 'Показывать уведомление галереи',
        settings_show_gallery_notice_desc: 'Показывать уведомление при сохранении фотографий в системную галерею',
        settings_toolbar_title: 'Настройки кнопок панели инструментов',
        settings_show_attach_button: 'Показать кнопку вложения',
        settings_show_attach_button_desc: 'Показать кнопку вставки вложений на панели инструментов редактора',
        settings_show_camera_button: 'Показать кнопку камеры',
        settings_show_camera_button_desc: 'Показать кнопку камеры на панели инструментов редактора',
        settings_notice_title: 'Настройки уведомлений',
        settings_show_saving_notice: 'Показать уведомление о сохранении',
        settings_show_saving_notice_desc: 'Показывать уведомление при сохранении фотографий',
        settings_show_insert_notice: 'Показать уведомление о вставке',
        settings_show_insert_notice_desc: 'Показывать уведомление, когда фотографии успешно вставлены',
        settings_file_size_limit: 'Ограничение размера файла (МБ)',
        settings_file_size_limit_desc: 'Максимальный размер файла (0 или пусто = без ограничений)',
        settings_version: 'Версия',
        settings_platform: 'Поддерживаемые платформы',
        settings_author: 'Автор',
    },
};

let currentLang: string = 'en';

const supportedLanguages = ['zh', 'en', 'ja', 'ko', 'fr', 'de', 'es', 'pt', 'ru'];

export function getSystemLanguage(): string {
    const storedLang = localStorage.getItem('language');
    if (storedLang && translations[storedLang]) {
        return storedLang;
    }

    const lang = navigator.language || 'en';
    const langCode = lang.toLowerCase();
    
    if (translations[langCode]) {
        return langCode;
    }
    
    const shortCode = langCode.split('-')[0];
    if (translations[shortCode]) {
        return shortCode;
    }
    
    if (supportedLanguages.includes(shortCode)) {
        return shortCode;
    }
    
    return 'en';
}

export function setLanguage(lang: string): void {
    if (translations[lang]) {
        currentLang = lang;
        localStorage.setItem('language', lang);
    } else {
        const langCode = lang.toLowerCase().split('-')[0];
        if (translations[langCode]) {
            currentLang = langCode;
            localStorage.setItem('language', langCode);
        } else {
            currentLang = 'en';
        }
    }
}

export function t(key: TranslationKey, params?: Record<string, string | number>): string {
    const translation = translations[currentLang]?.[key] || translations['en']?.[key] || key;
    
    if (!params) {
        return translation;
    }
    
    return translation.replace(/\{(\w+)\}/g, (match: string, paramKey: string): string => {
        return params[paramKey]?.toString() || match;
    });
}

export function getCurrentLanguage(): string {
    return currentLang;
}
