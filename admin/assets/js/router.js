let workerid = sessionStorage.getItem("id");
let menbername = sessionStorage.getItem("name");

//auth

if (workerid == null || menbername == null) {
    pagechange('loginadminrst')
}

function pagechange(data) {//---------------------------------->
    window.location = `../views/${data}.html`;
}



document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('main-page');

    const routes = {
        '#/': '/admin/views/home.html',
        '#/about': 'About',
        '#/contact': 'Contact',
        "index": "/admin/index.html",
        "/admin/index.html": "/admin/views/home.html",
        "#/home": "/admin/views/home.html",
        "#/listar": "/admin/views/listar.html",
        "#/create": "/admin/views/create.html",
        "#/update": "/admin/views/update.html",
        "/sobre": "/admin/views/sobre.html",
        404: "/admin/views/404.html"
    };

    const renderContent = async () => {
        const currentRoute = window.location.hash || '#/';
        const content = routes[currentRoute] || 'Not Found';
        const html = await fetch(content).then((data) => data.text());
        app.innerHTML = html;
    };

    const handleNavigation = () => {
        renderContent();
    };

    handleNavigation();

    document.addEventListener('DOMContentLoaded', handleNavigation);
    window.addEventListener('hashchange', handleNavigation);

    // Link click handler
    document.addEventListener('click', (event) => {
        if (event.target.tagName === 'A') {
            event.preventDefault();
            const href = event.target.getAttribute('href');
            window.location.hash = href;

        }
    });
});


function quit() {
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('name');

    window.location = "../../../views/loginadminrst.html";
};

// Remove the commented out block of code



// handleLocation();

