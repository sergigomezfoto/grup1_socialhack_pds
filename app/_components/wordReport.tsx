'use client'
import React from 'react';
import { useState, useEffect } from 'react';


const ReportComponent: React.FC<{ data: any }> = ({ data }) => {

    useEffect(() => {
        console.log('objecte: ', data);
    }, [data]);
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-white text-center mb-4">REPRESENTACIÓN GRÁFICA DE LA SEGMENTACIÓN</h1>
            <h2 className="text-2xl font-bold text-white text-center mb-4">(no visible para profesor)</h2>
            {data.segments.map((segment, index) => (
                <div key={index} className={`emotion ${segment.emotion.title}`}>
                    <div className="flex items-center">

                    <div className="inline-block m-2 py-0 px-2 rounded-3xl bg-slate-100 text-right">{segment.emotion.title}</div>         <sub>similaritat: {segment.score.toFixed(2)}</sub>
                    </div>
                    <p className="segment p-4">{segment.segment}</p>
           
                </div>
            ))}

            <div className={data.finalReport.alarm ? 'report alarm' : 'report normal-report'}>
                <h1 className="text-3xl font-bold text-white text-center mb-4 mt-8">PEQUEÑO RESUMEN ANONIMIZADO Y ALARMAS</h1>
                <h2 className="text-2xl font-bold text-white text-center mb-4">(visible para profesor)</h2>
                <h3>resumen</h3>
                <div className="bg-slate-300 text-black p-4 mb-6"> {data.finalReport.report}</div>

                <h3>alarmas</h3>
                {data.finalReport.alarm ? <>
                    <p className="alarm-content p-4 mb-6"> {data.finalReport.alarm}</p> </> :

                    <><p className="normal-content bg-green-400 inline-block mt-2 py-1 px-4 rounded-xl text-black"> sin alarmas </p></>
                }
            </div>
        </div>
    );
};

export default ReportComponent;