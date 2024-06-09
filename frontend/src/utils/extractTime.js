export const extractTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
  
    // Formatting hours and minutes to ensure they are always two digits
    const formattedHours = hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  
    // Constructing the time string in HH:MM format
    return `${formattedHours}:${formattedMinutes}`;
  }; 