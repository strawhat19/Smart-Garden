import Banner from "./banner";
import Explore from "./explore";
import SideMenu from "./sideMenu";
import ScrollToDiscover from "./scrollToDiscover";

export default function Main({ title, desc, children, className = `mainComponent` }: any) {
    return <>
        <main className={`main ${className}`}>
            <aside className={`aside sidebar`}>
                <SideMenu />
                <ScrollToDiscover />
            </aside>
            <Banner title={title} desc={desc} />
            <Explore />
        </main>
        <article>
            {children}
        </article>
    </>
}