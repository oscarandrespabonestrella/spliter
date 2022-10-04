import React from 'react'


export default function IntervalSplit(props) {
    const [periods, setPeriods] = React.useState([{start: 0, end: 100}])
    const max = 100;
    const split = (event) => {
        event.preventDefault();
        const startValue = parseInt(event.target.start.value);
        const endValue = parseInt(event.target.end.value);
        event.target.reset();
        periods.forEach((period, index) => {                            
            const nextPeriods = [...periods.slice(index + 1)];
            if(startValue < period.end && startValue > period.start ){
                if(endValue < period.end && period.end !== max){                    
                    setPeriods([...periods.slice(0, index), {start : period.start, end : startValue - 1}, {start: startValue, end: endValue}, {start: endValue + 1, end: period.end },...nextPeriods]);
                }else if(endValue === period.end && period.end !== max){
                    setPeriods([...periods.slice(0, index), {start : period.start, end : startValue - 1}, {start: startValue, end: endValue},...nextPeriods]);
                }else {                    
                    setPeriods([...periods.slice(0, index), {start : period.start, end : startValue - 1}, {start: startValue, end: endValue}, {start: endValue + 1, end: max }]);
                }
            }
            if(startValue < period.end && startValue === period.start ){                
                if(endValue < period.end && period.end !== max){
                    setPeriods([...periods.slice(0, index), {start : period.start, end : endValue},  {start: endValue + 1, end: period.end } ,...nextPeriods]);
                }else if(endValue === period.end && period.end !== max){
                    setPeriods([...periods.slice(0, index), {start : period.start, end : endValue}, ...nextPeriods]);
                }else {
                    setPeriods([...periods.slice(0, index), {start : period.start, end : endValue},  {start: endValue + 1, end: max }, {start: endValue + 1, end: max }]);
                }
            }
        });
      
    }

    const tiles = periods.map((period, key) => (
        <div key={key} className="tyle" style={{width: `${(period.end - period.start )}%`}} >{`${period.start}-${period.end}`}</div>
    ))

    return (
        <div className='interval-split'>
            <form className="form-container" onSubmit={split}>
                <div className='field'>
                    <label>Start: <input name='start' type='number' max="99" min="0" required/></label>
                </div>
                <div className='field'>
                    <label>End: <input name="end" type='number' max="100" min="1" required/></label>
                </div>
                <button type="submit">Split</button>
            </form>
            <div className='tyle-container'>
                {tiles}
            </div>
        </div>
    )
}

