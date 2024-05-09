import winston from "winston"

const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Asia/Kolkata'
  };

const logger = winston.createLogger({
    level : "info",
    format : winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({level, message, timestamp}) => {
            const date: Date = new Date(timestamp);
            const formattedDate: string = date.toLocaleString('en-IN', options);
            return `${formattedDate} : ${level.toUpperCase()} : ${message}`
        })
    ),
    transports : [
        new winston.transports.Console(),
        new winston.transports.File({ 
            filename: "logs/combined.log",
            level: "info" 
        }),
        new winston.transports.File({ 
            filename: "logs/error.log",
            level: "error" 
        }),
    
    ],
})

export default logger;
