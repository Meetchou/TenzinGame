import React from "react"

export default function Die ( props )
{

	return (
		<div className=
			{props.die.isHeld ? "die-face held-die" : "die-face"}
			onClick={props.toggle}>
			<h2 className="die-num" >{props.die.value}</h2>
		</div>
	)
}