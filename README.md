# 💼 Mi Sitio Web de CV Profesional & Portafolio

¡Bienvenido/a a tu sitio web de CV profesional! Este proyecto ha sido diseñado desde cero con una estética premium, responsive, interactiva y con soporte nativo de temas Claro/Oscuro.

El código está estructurado para ser extremadamente rápido, optimizado para SEO y fácil de personalizar con tus datos reales.

---

## 🛠️ Tecnologías Utilizadas

* **HTML5 Semántico** (Estructura robusta, accesible con ARIA y amigable para SEO).
* **CSS3 Personalizado** (Sistema de diseño con variables CSS, animaciones interactivas fluidas, y diseño responsive mobile-first).
* **JavaScript Moderno** (Funcionalidad ligera sin dependencias externas: Scroll Spy, animaciones dinámicas al hacer scroll, menú responsive y Dark/Light mode).

---

## 🚀 Cómo Ejecutar en Local

Puedes probar el sitio web localmente de dos formas sencillas:

1. **Directo:** Haz doble clic en el archivo `index.html` para abrirlo en cualquier navegador web.
2. **Servidor Local (Recomendado):** Si usas Visual Studio Code, te recomiendo instalar la extensión **Live Server** para que los cambios se recarguen automáticamente al guardar.
   * O puedes correr en tu terminal dentro de esta carpeta:
     ```bash
     npx serve
     ```

---

## 🔗 Cómo Desplegar a Internet Gratis (GitHub Pages)

Para conectar este código local con tu GitHub y publicarlo en vivo bajo tu propio dominio de GitHub Pages, sigue estos sencillos pasos en tu terminal:

### Paso 1: Configurar tus credenciales de Git (Si no lo has hecho antes)
```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tuemail@ejemplo.com"
```

### Paso 2: Crear el repositorio en GitHub
1. Entra a tu cuenta en [GitHub.com](https://github.com/).
2. Haz clic en el botón **New** (Nuevo Repositorio).
3. Nombra tu repositorio (ejemplo: `mi-cv` o `portafolio`).
4. **IMPORTANTE:** Déjalo como **Público** y **NO** añadas archivos `README`, `.gitignore` ni licencias (ya que los tenemos creados aquí).
5. Haz clic en **Create repository**.

### Paso 3: Conectar tu carpeta local con tu repositorio en GitHub
Copia la URL de tu repositorio de GitHub (se verá como `https://github.com/TU_USUARIO/TU_REPOSITORIO.git`) y ejecuta los siguientes comandos en tu terminal local:

```bash
# 1. Asegurar que estamos en la rama principal 'main'
git branch -M main

# 2. Agregar todos los archivos al control de versiones
git add .

# 3. Guardar tu primer commit de cambios
git commit -m "feat: estructura inicial de CV premium y configuracion técnica"

# 4. Vincular el repositorio local con el remoto de GitHub
# (Reemplaza la URL con la de tu repositorio creado)
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git

# 5. Subir tus archivos a internet
git push -u origin main
```

### Paso 4: Activar GitHub Pages (¡El Host!)
Una vez que hayas subido los archivos en el Paso 3:
1. En la página de tu repositorio en GitHub, ve a la pestaña **Settings** (Configuración) arriba a la derecha.
2. En la barra lateral izquierda, haz clic en la sección **Pages** (dentro del grupo *Code and automation*).
3. En la sección **Build and deployment**:
   * Bajo **Source**, asegúrate de que esté seleccionado **Deploy from a branch** (Desplegar desde una rama).
   * Bajo **Branch**, selecciona **main** y en la carpeta de al lado selecciona `/ (root)`.
   * Haz clic en **Save** (Guardar).
4. Espera aproximadamente 1 minuto. Recarga la página y arriba de la misma sección aparecerá un recuadro verde con tu URL pública en vivo, la cual se verá similar a:
   `https://TU_USUARIO.github.io/TU_REPOSITORIO/`

---

## 🔄 ¿Cómo actualizar tu página en el futuro?
Cada vez que hagamos un cambio en tu sitio web en el futuro y queramos publicarlo, solo deberás correr estos tres comandos en tu terminal:

```bash
git add .
git commit -m "Descripción de los cambios realizados"
git push
```
¡Y listo! En menos de un minuto los cambios estarán reflejados en vivo en internet.
