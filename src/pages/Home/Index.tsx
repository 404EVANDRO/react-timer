import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from "./styles";
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

const newCycleFormValidatorSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod
    .number()
    .min(5, 'O intervalo precisa ser de no mínimo 5 minutos')
    .max(60, 'O intervalo precisa ser de no máximo 60 minutos'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidatorSchema>

export function Home() {
    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidatorSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    })

    function handleCreateNewCycle(data: NewCycleFormData) {
        console.log(data)
        reset();
    }

    const task = watch('task')
    const isSubmitDisabled = !task;
    
    return( 
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                   <FormContainer>
                        <label htmlFor="task">Vou trabalhar em</label>
                        <TaskInput 
                            id="task" 
                            list="task-suggestions"
                            placeholder="Nome do projeto"
                            {...register('task')}
                        />
                        
                        <datalist id="task-suggestions">
                            <option value="Ibor"/>
                            <option value="Unilin"/>
                            <option value="Agrotrator"/>
                        </datalist>

                        <label htmlFor="">durante</label>
                        <MinutesAmountInput 
                        type="number"
                        id="minutesAmount"
                        placeholder="00"
                        min={5}
                        max={60}
                        />

                        <span>minutos.</span>
                   </FormContainer>

                    <CountdownContainer>
                        <span>0</span>
                        <span>0</span>
                        <Separator>:</Separator>
                        <span>0</span>
                        <span>0</span>
                    </CountdownContainer>

                    <StartCountdownButton disabled={isSubmitDisabled} type="submit">Começar
                        <Play size={24} />
                    </StartCountdownButton>
            </form>
        </HomeContainer>
    )
}