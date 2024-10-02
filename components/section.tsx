export default function Section({ children, background, fontColor, className = `sectionComponent` }: any) {
    return <>
        <section className={`section ${className}`} style={{ background: background, color: fontColor, padding: `var(--sectionPaddingS)` }}>
            {children}
        </section>
    </>
}