import "bootstrap/dist/css/bootstrap.css";

export function NavBar() {
    return (
        <nav className="navbar navbar-expand-md px-2 py-3">
            <div className="container px-2">
                <a className="navbar-brand p-0" href="/">
                    <img className="img-fluid align-text-top d-inline-block" src="https://cd.axelancerr.xyz/static/images/logo30x30.png" alt="logo"/>
                </a>
            </div>
        </nav>
    );
}