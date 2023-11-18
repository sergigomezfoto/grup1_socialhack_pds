'use client'
import React from 'react';
import { useState, useEffect } from 'react';


const ReportComponent: React.FC<{ data: any }> = ({ data }) => {

    useEffect(() => {
        console.log('objecte: ', data);
    }, [data]);
    return (
        <div>
            {data.segments.map((segment, index) => (
                <div key={index} className={`emotion ${segment.emotion.title}`}>
                    <p className="segment">{segment.segment}</p>
                    <span className="emotion-description">{segment.emotion.description}<br /><sub>similaritat: {segment.score.toFixed(2)}</sub></span>

                </div>
            ))}

            <div className={data.finalReport.alarm ? 'report alarm' : 'report normal-report'}>
                <h1>REPORT</h1>
                <p>{data.finalReport.report}</p>
                {data.finalReport.alarm &&
                    <p className="alarm-content"> {data.finalReport.alarm}</p>
                    }
            </div>
        </div>
    );
};

export default ReportComponent;