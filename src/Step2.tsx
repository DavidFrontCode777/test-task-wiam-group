import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useData, FormState } from "./DataContext"
import CategorySelect from "./components/CategorySelect"

export const Step2 = () => {
    const navigate = useNavigate();
    const { data, setValues } = useData();
    
    const { register, handleSubmit, control } = useForm({
        defaultValues: { category: data.category, address: data.address },
        mode: 'onBlur',
    })

    const onSubmit = (data: FormState) => {
        setValues(data)
        navigate('/step3')
    };

    const goBack = () => {
        navigate('/')
        
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="d-flex justify-content-center align-items-center vh-100">
            <div className="p-4 rounded d-flex flex-column gap-3 border border-dark min-w-h-square">
                <CategorySelect name="category" control={control} />
                <label>Адрес проживания</label>
                <input {...register('address', { required: true })} />
                <div className="d-flex justify-content-between">
                    <button type="button" className="btn btn-primary" onClick={goBack}>Назад</button>
                    <button type="submit" className="btn btn-primary">Далее</button>
                </div>
            </div>
        </form>
    )
}