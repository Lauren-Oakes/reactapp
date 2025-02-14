import { createContext, useContext, useState } from "react";
import InputGroup from "./InputGroup";

const TipContext = createContext({
    totalAmount: 0,
    tipAmountPerPerson: 0,
    setTotalAmount: (totalAmount, tipAmountPerPerson) => {},
})


export function TipForm() {

    const {setTotalAmount} = useContext(TipContext)
    const [tipAmount, setTipAmount] = useState("");

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
            <label className="font-6xl">Tip Calculator</label>
            <InputGroup type='number' label='Bill' placeholder='$' name='bill' />
            <div className="grid grid-cols-1 gap-4">
            <InputGroup type='number' label='Tip Amount' placeholder='Custom amount ' name='tip' value={tipAmount} onChange={(e) => setTipAmount(e.target.value)}/>
            <div className="grid grid-cols-2 gap-3 text-white">
                <button type="button" className="bg-[#16818f] px-3 py-2 rounded-full font-semibold border-black border-1" onClick={() => setTipAmount(5)}>5%</button>
                <button type="button"className="bg-[#16818f] px-3 py-2 rounded-full font-semibold  border-black border-1" onClick={() => setTipAmount(10)}>10%</button>
                <button type="button"className="bg-[#16818f] px-3 py-2 rounded-full font-semibold  border-black border-1" onClick={() => setTipAmount(15)}>15%</button>
                <button type="button"className="bg-[#16818f] px-3 py-2 rounded-full font-semibold  border-black border-1" onClick={() => setTipAmount(20)}>20%</button>
             </div>
             </div>
             <div className="grid grid-cols-1 gap-4">
                <InputGroup type='number' label='Number of People' placeholder='0' name='people' />        
            </div>

            <button className="text-white bg-[#16818f] px-3 py-2 rounded-full font-semibold">Calculate</button>
        </form>
    );
}

export function TipResult() {
    const { totalAmount, tipAmountPerPerson } = useContext(TipContext);

    return (
        <div className="bg-[#64b6c6] w-full h-full place-items-center rounded-bl-4xl rounded-r-md space-y-12 flex flex-col items-center p-8">
            <div className="flex flex-col w-full gap-6 justify-center">
                <div className="flex-1 bg-[#f0f8f9] p-6 border-2 border-[#16818f] rounded-xl shadow-lg text-center space-y-4">
                    <div className="text-xl text-[#16818f] mb-2">Tip per person</div>
                    <div className="text-xl  text-[#16818f]">
                        <span>$</span>
                        {parseFloat(tipAmountPerPerson).toFixed(2)}
                    </div>
                </div>

                <div className="flex-1 bg-[#f0f8f9] p-6 border-2 border-[#16818f] rounded-xl shadow-lg text-center space-y-4">
                    <div className="text-xl text-[#16818f] mb-2">Total per person</div>
                    <div className="text-xl text-[#16818f]">
                        <span>$</span>
                        {parseFloat(totalAmount).toFixed(2)}
                    </div>
                </div>
            </div>
        </div>
    );
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
         <div className='font-bold grid grid-cols-2 items-center max-w-2xl mx-auto'>
            <TipForm />
            <TipResult />
        </div>
       </TipContext.Provider>
        )
}

TipCalculatorComponent.Form = TipForm
TipCalculatorComponent.Result = TipResult