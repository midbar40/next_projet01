import EstimateForm from '@/components/forms/EstimateForm';
import { FormProvider } from '@/components/forms/FormContext';

const FormWrappedEstimateForm = () => {
    return (
        <FormProvider>
            <EstimateForm />
        </FormProvider>
    );
}

export default FormWrappedEstimateForm;