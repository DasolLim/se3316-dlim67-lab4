import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createGoal } from '../features/goals/goalSlice'

function GoalForm() {
    const [text, setText] = useState('')
    // Add a state to manage the privacy status
    const [isPrivate, setIsPrivate] = useState(false);

    const dispatch = useDispatch()

    const onSubmit = (e) => {
        e.preventDefault()

        dispatch(createGoal({ text: 'USER', isPrivate: true }));
        setText('')
        // Include isPrivate in the createGoal action
        setIsPrivate(false);
    }

    return (
        <section className='form'>
            <form onSubmit={onSubmit}>
                {/* Include a checkbox to mark the goal as private */}
                <div className='form-group'>
                    <label htmlFor='isPrivate'>Private Goal</label>
                    <input
                        type='checkbox'
                        name='isPrivate'
                        id='isPrivate'
                        checked={isPrivate}
                        onChange={() => setIsPrivate(!isPrivate)}
                    />
                </div>

                <div className='form-group'>
                    <label htmlFor='text'>Goal</label>
                    <input
                        type='text'
                        name='text'
                        id='text'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
                <div className='form-group'>
                    <button className='btn btn-block' type='submit'>
                        Add Goal
                    </button>
                </div>
            </form>
        </section>
    )
}

export default GoalForm