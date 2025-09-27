# PowerShell script to fix SecurityTokensSection.jsx data arrays

$filePath = "src\pages\Components\SecurityTokensSection.jsx"

# Define image replacements for data properties
$replacements = @{
    'userImage: "images/img_image_1_40x36.png"' = 'userImage: img_image_1_40x36'
    'userImage: "images/img_image_5_40x40.png"' = 'userImage: img_image_5_40x40'
    'userImage: "images/img_image_34x34.png"' = 'userImage: img_image_34x34'
    'userImage: "images/img_vector_40x40.png"' = 'userImage: img_vector_40x40'
    'userImage: "images/img_image_10.png"' = 'userImage: img_image_10'
    'userImage: "images/img_image_14.png"' = 'userImage: img_image_14'
    'imageEighteen: "images/img_image_40x40.png"' = 'imageEighteen: img_image_40x40'
    'imageNineteen: "images/img_ellipse_24.png"' = 'imageNineteen: img_ellipse_24'
    'imageEighteen: "images/img_image_7.png"' = 'imageEighteen: img_image_7'
    'imageEighteen: "images/img_image_8.png"' = 'imageEighteen: img_image_8'
    'imageEighteen: "images/img_image_9.png"' = 'imageEighteen: img_image_9'
    'imageEighteen: "images/img_image_10.png"' = 'imageEighteen: img_image_10'
    'imageEighteen: "images/img_image_11.png"' = 'imageEighteen: img_image_11'
    'userImage="images/img_image_12.png"' = 'userImage={img_image_12}'
    'userImage="images/img_image_15.png"' = 'userImage={img_image_15}'
}

# Process the file
$fullPath = Join-Path (Get-Location) $filePath
if (Test-Path $fullPath) {
    Write-Host "Processing: $filePath"
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
    Write-Host "File not found: $filePath"
}

Write-Host "SecurityTokensSection.jsx data array fixes completed!"