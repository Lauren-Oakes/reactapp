import { createContext, useContext, useState } from "react";
import InputGroup from "./InputGroup";

const TipContext = createContext({
    totalAmount: 0,
    tipAmountPerPerson: 0,
    setTotalAmount: (totalAmount, tipAmountPerPerson) => {},
})


export function TipForm() {

    const {setTotalAmount} = useContext(TipContext)
    const [tipAmount, setTipAmount] = useState(0);

    function handleSubmit(e)
    {
        e.preventDefault()

        const formData = new FormData(e.target)
        const data = Object.fromEntries(formData.entries())

        const{bill, tip, people} = data

        const billAmount = parseFloat(bill);
        const tipPercentage = parseFloat(tip || tipAmount);
        const numberOfPeople = parseInt(people);

        // Calculate tip amount
        const calculatedTipAmount = (tipPercentage / 100) * billAmount;

        // Calculate total amount (bill + tip)
        const totalAmount = billAmount + calculatedTipAmount;

        // Calculate tip amount per person
        const tipAmountPerPerson = calculatedTipAmount / numberOfPeople;


        setTotalAmount(totalAmount / numberOfPeople, tipAmountPerPerson);
    
    
    }

    return (
        <form onSubmit={handleSubmit}className="flex flex-col gap-6 rounded-l-xd">
            <InputGroup type='number' label='Bill' placeholder='$' name='bill' />
            <div className="grid grid-cols-1 gap-4">
            <InputGroup type='number' label='Tip Amount' placeholder='Custom amount ' name='tip' value={tipAmount} onChange={(e) => setTipAmount(e.target.value)}/>
            <div className="grid grid-cols-2 gap-4">
                <button type="button" className="bg-[#dada33] px-3 py-2 rounded-full font-semibold" onClick={() => setTipAmount(5)}>5%</button>
                <button type="button"className="bg-[#dada33] px-3 py-2 rounded-full font-semibold" onClick={() => setTipAmount(10)}>10%</button>
                <button type="button"className="bg-[#dada33] px-3 py-2 rounded-full font-semibold" onClick={() => setTipAmount(15)}>15%</button>
                <button type="button"className="bg-[#dada33] px-3 py-2 rounded-full font-semibold" onClick={() => setTipAmount(20)}>20%</button>
             </div>
             </div>
             <div className="grid grid-cols-1 gap-4">
                <InputGroup type='number' label='Number of People' placeholder='0' name='people' />        
            </div>

            <button className="bg-[#dada33] px-3 py-2 rounded-full font-semibold">Calculate</button>
        </form>
    );
}

export function TipResult(){
    const {totalAmount, tipAmountPerPerson} = useContext(TipContext)
    return (
        <div className="bg-[#133040] text-white w-full h-full rounded-bl-4xl rounded-r-md">
            <div>
                Total amount to be paid by each person: <br />
                {parseFloat(totalAmount).toFixed(2)} {/* Display the total amount per person */}
            </div>
            <div>
                Tip to be paid by each person: <br />
                {parseFloat(tipAmountPerPerson).toFixed(2)} {/* Display the tip per person */}
            </div>
        </div>
    )
}

export default function TipCalculatorComponent(){
    const [totalAmount, setTotalAmount] = useState(0)
    const [tipAmountPerPerson, setTipAmountPerPerson] = useState(0)

    const updateTotalAmount = (newTotalAmount, newTipAmountPerPerson) => {
        setTotalAmount(newTotalAmount);
        setTipAmountPerPerson(newTipAmountPerPerson);
    }
    return (
       <TipContext.Provider value={{totalAmount, tipAmountPerPerson, setTotalAmount: updateTotalAmount}} >
         <div className='grid grid-cols-2 items-center max-w-2xl mx-auto'>
            <TipForm />
            <TipResult />
        </div>
       </TipContext.Provider>
        )
}

TipCalculatorComponent.Form = TipForm
TipCalculatorComponent.Result = TipResult