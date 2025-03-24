import { Header, Footer, GridCard } from "@/components"
import exampleImageData from '@/data/exampleImageData.json'

export default function example() {
    return (
        <>
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '10rem',
                    marginBottom: '6rem'
                }}>
                <Header />
                <GridCard cards={exampleImageData} />
            </div>
            <Footer />
        </>
    )
}