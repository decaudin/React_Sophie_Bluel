import Banner from "../components/Banner/Banner";
import Projects from "../components/Projects/Projects";
import Contact from "../components/Contact/Contact";

const Home = ( {isAuthenticated}) => {
    return (
        <div>
            <Banner isAuthenticated={isAuthenticated} />
            <Projects isAuthenticated={isAuthenticated} />
            <Contact />
        </div>
    )
}

export default Home;