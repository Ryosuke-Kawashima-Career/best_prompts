<#
.SYNOPSIS
    Generates a clean ASCII directory tree representation for architecture visualization.
.PARAMETER TargetDir
    The root path to inspect (defaults to current directory).
.PARAMETER MaxDepth
    Maximum depth of folder recursion (defaults to 3).
.PARAMETER ExcludePatterns
    Patterns or folder names to ignore (e.g. node_modules, target, .git, dist).
#>
param(
    [string]$TargetDir = ".",
    [int]$MaxDepth = 3,
    [string[]]$ExcludePatterns = @("node_modules", "target", ".git", "dist", "dist-ssr", "logs", ".vscode", ".idea", "bin", "obj")
)

function Should-Exclude ($Path, $Name) {
    foreach ($pattern in $ExcludePatterns) {
        if ($Name -like $pattern -or $Path -like "*\$pattern\*" -or $Path -like "*/$pattern/*") {
            return $true
        }
    }
    return $false
}

function Show-Tree ($CurrentPath, $Prefix = "", $CurrentDepth = 0) {
    if ($CurrentDepth -ge $MaxDepth) {
        return
    }

    $items = Get-ChildItem -Path $CurrentPath -Force | Where-Object {
        -not (Should-Exclude -Path $_.FullName -Name $_.Name)
    } | Sort-Object { -not $_.PSIsContainer }, Name

    $count = $items.Count
    for ($i = 0; $i -lt $count; $i++) {
        $item = $items[$i]
        $isLast = ($i -eq ($count - 1))
        
        $marker = if ($isLast) { "+-- " } else { "|-- " }
        $childPrefix = if ($isLast) { "    " } else { "|   " }

        $typeIndicator = if ($item.PSIsContainer) { "/" } else { "" }
        Write-Output "$Prefix$marker$($item.Name)$typeIndicator"

        if ($item.PSIsContainer) {
            Show-Tree -CurrentPath $item.FullName -Prefix ($Prefix + $childPrefix) -CurrentDepth ($CurrentDepth + 1)
        }
    }
}

$resolvedPath = (Resolve-Path $TargetDir).Path
Write-Output "Directory tree for: $resolvedPath"
Write-Output "."
Show-Tree -CurrentPath $resolvedPath -Prefix "" -CurrentDepth 0
