import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { FormState, useData } from "./DataContext"
import PhoneInput from "./components/PhoneInput"

export const Step1 = () => {    
    const { data, setValues } = useData();
    const { register, handleSubmit, control } = useForm({
        defaultValues: {
            name: data.name,
            surname: data.surname,
            gender: data.gender,
            phone: data.phone
        },
        mode: 'onBlur',
    })
    const navigate = useNavigate();
    const onSubmit = (data: FormState) => {
        setValues(data)
        navigate('/step2')
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="d-flex justify-content-center align-items-center vh-100">
            <div className="p-4 rounded d-flex flex-column gap-3 border border-dark min-w-h-square">
                <div>Шаг 1</div>
                <label>Имя</label>
                <input {...register('name', { required: true })} />
                <label>Фамилия</label>
                <input {...register('surname', { required: true })} />
                <label>Пол</label>
                <select {...register('gender', { required: true })}>
                    <option value='female'>женский</option>
                    <option value='male'>мужской</option>
                    <option value='other'>другое</option>
                </select>
                <PhoneInput name='phone' control={control} />
                <button type='submit' className="btn btn-primary">
                    Далее
                </button> 
            </div>
        </form>
    )
}