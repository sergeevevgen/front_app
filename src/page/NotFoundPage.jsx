import { Link } from 'react-router-dom'

const NotFoundPage = () => {
    return (
        <article style={{ padding: "100px" }}>
            <h1>Oops!</h1>
            <p>Page Not Found</p>
            <div className="flexGrow">
                This page doesn't exist. Go <Link to="/">Домой</Link>
            </div>
        </article>
    )
}

export {NotFoundPage};
