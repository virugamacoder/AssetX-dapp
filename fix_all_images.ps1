# PowerShell script to replace all relative image paths with imported variables

# Define file paths to fix
$files = @(
    "src\pages\swap\index.jsx",
    "src\pages\liquidity\liquidityList\index.jsx", 
    "src\pages\Components\index.jsx",
    "src\components\AccreditedProfile\index.jsx",
    "src\components\Header\index.jsx",
    "src\components\UserProfile5\index.jsx",
    "src\components\Footer\index.jsx",
    "src\components\UserProfile6\index.jsx"
)

# Define image replacements
$replacements = @{
    'src="images/img_settings_svgrepo_com.svg"' = 'src={img_settings_svgrepo_com}'
    'src="images/img_light_bulb.svg"' = 'src={img_light_bulb}'
    'src="images/img_frame.png"' = 'src={img_frame}'
    'src="images/img_search.svg"' = 'src={img_search}'
    'src="images/img_arrowdown.svg"' = 'src={img_arrowdown}'
    'src="images/img_filter.svg"' = 'src={img_filter}'
    'src="images/img_arrow_down_brand_color_1.svg"' = 'src={img_arrow_down_brand_color_1}'
    'src="images/img_image_2.png"' = 'src={img_image_2}'
    'src="images/img_globe.svg"' = 'src={img_globe}'
    'src="images/img_music.svg"' = 'src={img_music}'
    'src="images/img_group_30.svg"' = 'src={img_group_30}'
    'src="images/img_warning.svg"' = 'src={img_warning}'
    'src="images/img_info.svg"' = 'src={img_info}'
    'src="images/img_secure_svgrepo_com.png"' = 'src={img_secure_svgrepo_com}'
    'src="images/img_image_438x780.png"' = 'src={img_image_438x780}'
    'src="images/img_image_48x48.png"' = 'src={img_image_48x48}'
    'src="images/img_arrow_up.svg"' = 'src={img_arrow_up}'
    'src="images/img_checkmark.svg"' = 'src={img_checkmark}'
    'src="images/img_info_circle_svgrepo_com.svg"' = 'src={img_info_circle_svgrepo_com}'
    'src="images/img_vector.png"' = 'src={img_vector}'
    'src="images/img_vector_8x14.png"' = 'src={img_vector_8x14}'
    'src="images/img_copy_svgrepo_com.png"' = 'src={img_copy_svgrepo_com}'
    'src="images/img_metamaskfox_1_gray_900_02.svg"' = 'src={img_metamaskfox_1_gray_900_02}'
    'src="images/img_mail_svgrepo_com.png"' = 'src={img_mail_svgrepo_com}'
    'src="images/img_close_md_svgrepo_com.svg"' = 'src={img_close_md_svgrepo_com}'
    'src="images/img_metamask_fox_1.svg"' = 'src={img_metamask_fox_1}'
    'src="images/img_copysvgrepocom_1.png"' = 'src={img_copysvgrepocom_1}'
    'src="images/img_vector_20x20.png"' = 'src={img_vector_20x20}'
    'src="images/img_calendar_svgrepo_com.png"' = 'src={img_calendar_svgrepo_com}'
    'src="images/img_image_230x408.png"' = 'src={img_image_230x408}'
    'src="images/img_image_1.png"' = 'src={img_image_1}'
    'src="images/img_polygonlogofreelogovectorsnet_1.png"' = 'src={img_polygonlogofreelogovectorsnet_1}'
    'src="images/img_header_logo.png"' = 'src={img_header_logo}'
    'src="images/img_arrowright336.svg"' = 'src={img_arrowright336}'
    'src="images/img_arrow_right_336_white_a700.svg"' = 'src={img_arrow_right_336_white_a700}'
    'src="images/img_footer_logo.png"' = 'src={img_footer_logo}'
    'src="images/img_facebook.svg"' = 'src={img_facebook}'
    'src="images/img_trash.svg"' = 'src={img_trash}'
    'src="images/img_warning_black_400.svg"' = 'src={img_warning_black_400}'
    'src="images/img_info_black_400.svg"' = 'src={img_info_black_400}'
    'src="images/img_user.svg"' = 'src={img_user}'
    # Default props replacements
    'userImage = "images/img_image_1_40x36.png"' = 'userImage = img_image_1_40x36'
    'tokenImage = "images/img_image_12.png"' = 'tokenImage = img_image_12'
}

# Process each file
foreach ($file in $files) {
    $fullPath = Join-Path (Get-Location) $file
    if (Test-Path $fullPath) {
        Write-Host "Processing: $file"
        $content = Get-Content $fullPath -Raw
        
        foreach ($find in $replacements.Keys) {
            $replace = $replacements[$find]
            if ($content -like "*$find*") {
                $content = $content -replace [regex]::Escape($find), $replace
                Write-Host "  Replaced: $find -> $replace"
            }
        }
        
        Set-Content $fullPath $content -NoNewline
        Write-Host "  File updated successfully"
    } else {
        Write-Host "File not found: $file"
    }
}

Write-Host "All image path replacements completed!"