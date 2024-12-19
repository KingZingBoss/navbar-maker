document.addEventListener("DOMContentLoaded", () => {
    const navbarBgInput = document.getElementById("navbar-bg");
    const linkColorInput = document.getElementById("link-color");
    const borderRadiusInput = document.getElementById("border-radius");
    const shadowInput = document.getElementById("shadow");
    const previewNavbar = document.getElementById("preview-navbar");
    const downloadButton = document.getElementById("download-code");

    function updateNavbar() {
        previewNavbar.style.backgroundColor = navbarBgInput.value;
        previewNavbar.style.borderRadius = `${borderRadiusInput.value}px`;
        previewNavbar.style.boxShadow = `0.25rem 0.25rem ${shadowInput.value / 10}rem #050505`;

        const links = previewNavbar.querySelectorAll("a");
        links.forEach(link => {
            link.style.color = linkColorInput.value;
        });
    }

    function generateCode() {
        const cssCode = `
.nav {
    background: ${navbarBgInput.value};
    border-radius: ${borderRadiusInput.value}px;
    box-shadow: 0.25rem 0.25rem ${shadowInput.value / 10}rem #050505;
}
.nav .right a {
    color: ${linkColorInput.value};
}
        `;
        const htmlCode = `
<div class="nav">
    <span>Navbar</span>
    <div class="right">
        <a href="#">Link</a>
        <a href="#">Link</a>
        <a href="#">Link</a>
    </div>
</div>
        `;
        return { css: cssCode, html: htmlCode };
    }

    function downloadCode() {
        const { css, html } = generateCode();
        const zip = new JSZip();
        zip.file("style.css", css);
        zip.file("index.html", html);
        zip.generateAsync({ type: "blob" }).then(content => {
            const a = document.createElement("a");
            a.href = URL.createObjectURL(content);
            a.download = "navbar_creator.zip";
            a.click();
        });
    }

    navbarBgInput.addEventListener("input", updateNavbar);
    linkColorInput.addEventListener("input", updateNavbar);
    borderRadiusInput.addEventListener("input", updateNavbar);
    shadowInput.addEventListener("input", updateNavbar);
    downloadButton.addEventListener("click", downloadCode);

    // Initialize preview with default values
    updateNavbar();
});
