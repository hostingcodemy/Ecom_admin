import React from 'react';

const CardWidget = ({ number, subtitle, onClick,index }) => {
    return (
        <div className="cardNEw" onClick={onClick} style={{backgroundColor:"#e4e5e3",height:"3vw",width:"13vw",cursor:"pointer"}} id={`${index===7?"lastCardNew":""}`}>
                <div className="media">
                    <div className="media-body" style={{fontSize:"1vw",paddingLeft:"0.3vw",paddingRight:"0.3vw",paddingTop:"0.2vw",gap:"0.1vw",display:"flex",flexDirection:"column"}}>
                        <div style={{backgroundColor:"white",borderRadius:"1vw",textAlign:"center",fontWeight:"700"}}>&#8377;{number}</div>
                        <div style={{fontSize:"0.7vw",fontWeight:"300",textAlign:"center",color:"black"}}>{subtitle}</div>
                    </div>
                    {/* {props.svg} */}
                </div>
            {/* <div className="progress  rounded-0" style={{height:"4px"}}>
                <div className="progress-bar rounded-0 bg-secondary progress-animated" style={{width: props.progress, height:"4px" }}>
                    <span className="sr-only">{props.progress} Complete</span>
                </div>
            </div> */}
        </div>
    );
};

export default CardWidget;