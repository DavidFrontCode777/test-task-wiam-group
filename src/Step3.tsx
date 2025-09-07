import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useData, FormState } from "./DataContext"
import RangeSlider from "./components/RangeSlider"

export const Step3 = () => {
    const [showModal, setShowModal] = useState(false)
    const navigate = useNavigate();
    const { data, setValues } = useData();
    const { handleSubmit, control } = useForm({
        defaultValues: { loanAmount: data.loanAmount, loanTerm: data.loanTerm},
        mode: 'onBlur',
    })

    const onSubmit: SubmitHandler<FormState> = async (dataFromTheForm: FormState) => {
        setValues(dataFromTheForm)
        try {
          await fetch("https://dummyjson.com/products/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: `${data.name} ${data.surname}`,
            }),
          });
          setShowModal(true)
        } catch (error) {
          console.error("Ошибка при добавлении продукта:", error);
        }
      };

    const goBack = () => {
        navigate('/step2')
    }

    return (
        <>
        <form onSubmit={handleSubmit(onSubmit)} className="d-flex justify-content-center align-items-center vh-100">
            <div className="p-4 rounded d-flex flex-column gap-3 border border-dark min-w-h-square">
                <RangeSlider
                    control={control}
                    name="loanAmount"
                    label="Сумма займа"
                    min={200}
                    max={1000}
                    step={100}
                    unit="$"
                />
                <RangeSlider
                    control={control}
                    name="loanTerm"
                    label="Срок займа"
                    min={10}
                    max={30}
                    step={1}
                    unit="дней"
                />
                <div className="d-flex justify-content-between">
                    <button className="btn btn-primary" onClick={goBack}>Назад</button>
                    <button type="submit" className="btn btn-primary">Подать заявку</button>
                </div>
            </div>
        </form>
        {showModal && (
            <div
                className="modal fade show"
                style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
            >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content p-3">
                <div className="modal-body">
                    <p>
                        Поздравляем, {data.surname} {data.name} . Вам одобрено {data.loanAmount}$ на {data.loanTerm} дней.<br />
                    </p>
                </div>
                <div className="modal-footer">
                    <button
                        className="btn btn-secondary"
                        onClick={() => setShowModal(false)}
                    >
                        Закрыть
                    </button>
                </div>
                </div>
            </div>
            </div>
        )}
        </>
        
    )
}