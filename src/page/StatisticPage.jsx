import { Link } from "react-router-dom";

const StatisticPage = () => {
    return (
        <section>
            <h1>Statistic Page</h1>
            <br />
            <br />
            <div className="flexGrow">
                <Link to="/">Домой</Link>
            </div>
        </section>
    )
}

export {StatisticPage}