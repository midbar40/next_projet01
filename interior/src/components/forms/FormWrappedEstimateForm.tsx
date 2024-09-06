import EstimateForm from '@/components/forms/EstimateForm';
import { FormProvider } from '@/components/forms/FormContext';
import { ReCaptchaProvider } from "next-recaptcha-v3";

const FormWrappedEstimateForm = () => {
    return (
        <ReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}>
            <FormProvider>
                <EstimateForm />
            </FormProvider>
        </ReCaptchaProvider>
    );
}

export default FormWrappedEstimateForm;