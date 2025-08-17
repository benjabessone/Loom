# Script de Despliegue Automatico para GitHub
# Ejecutar como: .\deploy.ps1

Write-Host "Iniciando despliegue en GitHub..." -ForegroundColor Green

# Verificar si Git esta instalado
try {
    git --version | Out-Null
    Write-Host "Git encontrado" -ForegroundColor Green
} catch {
    Write-Host "Git no esta instalado. Descargalo desde: https://git-scm.com/" -ForegroundColor Red
    exit 1
}

# Verificar si estamos en la carpeta correcta
if (-not (Test-Path "index.html")) {
    Write-Host "No se encontro index.html. Asegurate de estar en la carpeta del proyecto." -ForegroundColor Red
    exit 1
}

Write-Host "Archivos del proyecto encontrados" -ForegroundColor Green

# Solicitar informacion del repositorio
$usuario = Read-Host "Ingresa tu nombre de usuario de GitHub"
$repo = Read-Host "Ingresa el nombre del repositorio (por defecto: loom-digital-landing)"

if ([string]::IsNullOrWhiteSpace($repo)) {
    $repo = "loom-digital-landing"
}

$repoUrl = "https://github.com/$usuario/$repo.git"

Write-Host "Configuracion:" -ForegroundColor Yellow
Write-Host "   Usuario: $usuario" -ForegroundColor White
Write-Host "   Repositorio: $repo" -ForegroundColor White
Write-Host "   URL: $repoUrl" -ForegroundColor White

$confirmar = Read-Host "Continuar con el despliegue? (s/n)"
if ($confirmar -ne "s" -and $confirmar -ne "S" -and $confirmar -ne "y" -and $confirmar -ne "Y") {
    Write-Host "Despliegue cancelado" -ForegroundColor Red
    exit 0
}

# Inicializar Git si no existe
if (-not (Test-Path ".git")) {
    Write-Host "Inicializando repositorio Git..." -ForegroundColor Yellow
    git init
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Error al inicializar Git" -ForegroundColor Red
        exit 1
    }
}

# Agregar archivos
Write-Host "Agregando archivos..." -ForegroundColor Yellow
git add .
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error al agregar archivos" -ForegroundColor Red
    exit 1
}

# Hacer commit
$mensaje = Read-Host "Mensaje del commit (por defecto: 'Deploy: Landing page completa')"
if ([string]::IsNullOrWhiteSpace($mensaje)) {
    $mensaje = "Deploy: Landing page completa"
}

Write-Host "Creando commit..." -ForegroundColor Yellow
git commit -m "$mensaje"
if ($LASTEXITCODE -ne 0) {
    Write-Host "No hay cambios para hacer commit o error en commit" -ForegroundColor Yellow
}

# Configurar remote si no existe
$remoteExists = git remote get-url origin 2>$null
if (-not $remoteExists) {
    Write-Host "Configurando repositorio remoto..." -ForegroundColor Yellow
    git remote add origin $repoUrl
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Error al configurar repositorio remoto" -ForegroundColor Red
        exit 1
    }
}

# Configurar rama principal
Write-Host "Configurando rama principal..." -ForegroundColor Yellow
git branch -M main

# Push al repositorio
Write-Host "Subiendo archivos a GitHub..." -ForegroundColor Yellow
Write-Host "   (Se te pedira tu usuario y token de GitHub)" -ForegroundColor Cyan
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "" 
    Write-Host "Despliegue exitoso!" -ForegroundColor Green
    Write-Host "" 
    Write-Host "Proximos pasos:" -ForegroundColor Yellow
    Write-Host "   1. Ve a: https://github.com/$usuario/$repo" -ForegroundColor White
    Write-Host "   2. Ve a Settings > Pages" -ForegroundColor White
    Write-Host "   3. Selecciona 'Deploy from a branch' > 'main'" -ForegroundColor White
    Write-Host "   4. Tu sitio estara en: https://$usuario.github.io/$repo" -ForegroundColor White
    Write-Host "" 
    Write-Host "El sitio puede tardar 5-10 minutos en estar disponible" -ForegroundColor Cyan
    
    # Abrir GitHub en el navegador
    $abrirGitHub = Read-Host "Abrir GitHub en el navegador? (s/n)"
    if ($abrirGitHub -eq "s" -or $abrirGitHub -eq "S" -or $abrirGitHub -eq "y" -or $abrirGitHub -eq "Y") {
        Start-Process "https://github.com/$usuario/$repo"
    }
} else {
    Write-Host "Error durante el push. Verifica:" -ForegroundColor Red
    Write-Host "   - Tu usuario y token de GitHub" -ForegroundColor White
    Write-Host "   - Que el repositorio existe" -ForegroundColor White
    Write-Host "   - Tu conexion a internet" -ForegroundColor White
}

Write-Host "" 
Write-Host "Para mas ayuda, consulta DEPLOY.md" -ForegroundColor Cyan
Pause