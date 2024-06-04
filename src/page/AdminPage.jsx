import { Link } from "react-router-dom";

const AdminPage = () => {
    return (
        <section>
            <h1>Admins Page</h1>
            <br />
            <br />
            <div className="flexGrow">
                <Link to="/">Домой</Link>
            </div>
        </section>
    )
}

export {AdminPage}