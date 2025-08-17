# 🚀 Guía de Despliegue en GitHub

## Paso 1: Crear Repositorio en GitHub

1. Ve a [GitHub.com](https://github.com) e inicia sesión
2. Haz clic en el botón **"+"** en la esquina superior derecha
3. Selecciona **"New repository"**
4. Configura el repositorio:
   - **Repository name**: `loom-digital-landing`
   - **Description**: `Landing page profesional para Loom Digital Web`
   - **Public** (recomendado para GitHub Pages gratuito)
   - ❌ NO marques "Add a README file" (ya tenemos uno)
   - ❌ NO agregues .gitignore ni licencia por ahora
5. Haz clic en **"Create repository"**

## Paso 2: Subir Archivos al Repositorio

### Opción A: Usando Git (Recomendado)

1. Abre PowerShell en la carpeta del proyecto:
   ```powershell
   cd "C:\Users\Usuario\Desktop\landing"
   ```

2. Inicializa Git:
   ```powershell
   git init
   ```

3. Agrega todos los archivos:
   ```powershell
   git add .
   ```

4. Haz el primer commit:
   ```powershell
   git commit -m "Initial commit: Landing page completa"
   ```

5. Conecta con tu repositorio de GitHub:
   ```powershell
   git remote add origin https://github.com/TU-USUARIO/loom-digital-landing.git
   ```
   > ⚠️ Reemplaza `TU-USUARIO` con tu nombre de usuario de GitHub

6. Sube los archivos:
   ```powershell
   git branch -M main
   git push -u origin main
   ```

### Opción B: Subida Manual (Interfaz Web)

1. En tu repositorio de GitHub, haz clic en **"uploading an existing file"**
2. Arrastra todos los archivos del proyecto a la zona de subida
3. Escribe un mensaje de commit: "Initial commit: Landing page completa"
4. Haz clic en **"Commit changes"**

## Paso 3: Activar GitHub Pages

1. En tu repositorio, ve a la pestaña **"Settings"**
2. Desplázate hacia abajo hasta la sección **"Pages"**
3. En **"Source"**, selecciona **"Deploy from a branch"**
4. En **"Branch"**, selecciona **"main"**
5. Deja **"/ (root)"** como carpeta
6. Haz clic en **"Save"**

## Paso 4: Verificar el Despliegue

1. GitHub te mostrará la URL de tu sitio:
   ```
   https://TU-USUARIO.github.io/loom-digital-landing
   ```

2. El despliegue puede tardar 5-10 minutos
3. Verifica que el sitio funcione correctamente
4. Comprueba que todas las imágenes se carguen
5. Prueba el formulario de contacto

## 🔧 Configuraciones Adicionales

### Dominio Personalizado (Opcional)

1. En Settings > Pages, en **"Custom domain"**
2. Ingresa tu dominio: `www.loomdigitalweb.com`
3. Crea un archivo `CNAME` en la raíz con tu dominio
4. Configura los DNS de tu dominio:
   ```
   CNAME www TU-USUARIO.github.io
   ```

### HTTPS (Automático)

- GitHub Pages habilita HTTPS automáticamente
- Marca **"Enforce HTTPS"** en Settings > Pages

## 📊 Monitoreo y Analytics

### Google Analytics
1. Ve a [Google Analytics](https://analytics.google.com)
2. Crea una nueva propiedad para tu sitio
3. Copia el Measurement ID (formato: G-XXXXXXXXXX)
4. Reemplaza `GA_MEASUREMENT_ID` en `index.html`
5. Haz commit y push de los cambios

### Google Search Console
1. Ve a [Google Search Console](https://search.google.com/search-console)
2. Agrega tu sitio como propiedad
3. Verifica la propiedad usando el meta tag o archivo HTML
4. Envía tu sitemap: `https://tu-sitio.com/sitemap.xml`

## 🚀 Comandos Útiles para Actualizaciones

```powershell
# Para futuras actualizaciones:
git add .
git commit -m "Descripción de los cambios"
git push

# Ver estado de los archivos:
git status

# Ver historial de commits:
git log --oneline
```

## ✅ Checklist Final

- [ ] Repositorio creado en GitHub
- [ ] Archivos subidos correctamente
- [ ] GitHub Pages activado
- [ ] Sitio accesible en la URL de GitHub Pages
- [ ] Todas las imágenes se cargan correctamente
- [ ] Formulario funciona (muestra mensaje de éxito)
- [ ] Sitio es responsive en móvil y desktop
- [ ] Google Analytics configurado (opcional)
- [ ] Dominio personalizado configurado (opcional)

## 🆘 Solución de Problemas

### Error 404 en GitHub Pages
- Verifica que el archivo se llame `index.html`
- Asegúrate de que esté en la raíz del repositorio
- Espera 5-10 minutos para la propagación

### Imágenes no se cargan
- Verifica que las rutas sean relativas (sin `/` al inicio)
- Asegúrate de que los nombres coincidan exactamente
- GitHub es case-sensitive: `Logo.png` ≠ `logo.png`

### Cambios no se reflejan
- Limpia la caché del navegador (Ctrl+F5)
- Verifica que los cambios estén en GitHub
- Espera unos minutos para la propagación

---

¡Tu landing page estará lista y accesible para todo el mundo! 🎉