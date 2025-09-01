import { apidelete } from "../apiservice"
export default function Card(props){
    return(
        <div className="outBox">
        <div className="heading-row">
            <h2>{props.heading}</h2>
            <button
            onClick={async () => {
                await apidelete('/api/healthconditions', {condition: props.heading});
                props.refresh();
            }}
            className="delete-btn-med"
            >
            <img src="./src/assets/delete.svg" alt="delete" />
            </button>
        </div>
        <p>{props.description}</p>
        </div>
    )
}