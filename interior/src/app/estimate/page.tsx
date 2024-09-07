import { Header, Footer } from "@/components"
import FormWrappedEstimateForm from '@/components/forms/FormWrappedEstimateForm'

export default function page() {
    return (
        <>
            <Header />
            <div style={{
                marginTop: '5rem',
                backgroundColor: 'rgb(255, 255, 255)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <FormWrappedEstimateForm />
            </div>
            <Footer />
        </>
    )
}