import { useRef, useState, useEffect } from "react"
import { Header } from "./Header";
import { useLocation, useNavigate } from "react-router-dom";

export function Opt() {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email || "your email";
    const refs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];
    const [code, setCode] = useState(['1', '2', '3', '4', '5', '6']);
    const [timer, setTimer] = useState(32);


    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000)
            return () => clearInterval(interval);
        }
    }, [timer])

    useEffect(() => {
        refs.forEach((ref, index) => {
            if (ref.current) {
                ref.current.value = code[index];
            }
        });
    }, []);

    const handleResend = () => {
        setTimer(32);
        setCode(['1', '2', '3', '4', '5', '6']);
        refs.forEach((ref, index )=> {
            if (ref.current) {
                ref.current.value =['1', '2', '3', '4', '5', '6'][index];
            }
        });
        console.log('Resending code...');
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleInputChange = (index, value) => {
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value && index < refs.length - 1) {
            refs[index + 1].current.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace') {
            if (!e.target.value && index > 0) {
                refs[index - 1].current.focus();
                refs[index - 1].current.value = '';

                const newCode = [...code];
                newCode[index - 1] = '';
                setCode(newCode);
            }
        }
    }

    const handleContinue = () => {
        const fullCode = code.join('');
        if (fullCode.length === 6) {
            console.log('OTP Code:', fullCode);
            navigate('/hero')
        }
    };

    const isCodeComplete = code.every(digit => digit !== '');

    return (
        <div className='h-screen bg-[#012d59]'>
            <Header />
            <div className="flex justify-center pt-20">
                <div className="text-center">
                    <h1 className="text-white text-3xl font-bold mb-6">
                        Check Your Email For A Code
                    </h1>
                    <p className="pt-10 text-lg mb-6 text-[#6586a8]">
                        Please enter the verification code sent to your email: {email}
                    </p>
                </div>
            </div>
            <div className="flex justify-center">
                {refs.map((ref, index) => (
                    <SubOptBox
                        key={index}
                        reference={ref}
                        onDone={(value) => handleInputChange(index, value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                    />
                ))}

            </div>
            <div className="flex items-center justify-center gap-2 mb-8 pt-1">
                <svg className="w-5 h-5 text-[#6586a8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12,6 12,12 16,14" />
                </svg>
                <span className="text-[#6586a8] text-lg font-mono">
                    {formatTime(timer)}
                </span>
            </div>
            <div className="flex justify-center pt-1">
                <span
                    onClick={handleContinue}
                    className={`rounded text-sm px-34 py-3 text-white cursor-pointer ${isCodeComplete ? "bg-[#68d5d7]" : "bg-[#7e96aa]"}`}
                >
                    Continue
                </span>
            </div>
            <div className="flex justify-center pt-3">
                <p className="text-[#6586a8]">
                Can't find the email?{' '}
                <button
                    onClick={handleResend}
                    className="text-white underline hover:text-white transition-colors"
                >
                    Click here to resend.
                </button>
            </p>
            </div>
        </div>
    )
}

function SubOptBox({ reference, onDone, onKeyDown }) {
    const handleChange = (e) => {
        const value = e.target.value;
        if (value && !/^\d$/.test(value)) {
            e.target.value = '';
            return;
        }
        if (value.length === 1) {
            onDone?.(value);
        }
    };

    return (
        <div>
            <input
                ref={reference}
                onChange={handleChange}
                onKeyDown={onKeyDown}
                maxLength={1}
                type="text"
                className="m-1 w-[40px] h-[50px] rounded-xl bg-[#19416b] outline-none px-2 text-center text-white"
            />
        </div>
    )
}