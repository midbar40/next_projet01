import { Header, Footer, EstimateForm } from "@/components"

export default function page() {
    return(
        <>
            <Header />
            <div style={{
                    marginTop: '10rem',
                    backgroundColor: 'rgb(255, 255, 255)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
            }}>
                <EstimateForm />
            </div>
            <Footer />
        </>
    )
}