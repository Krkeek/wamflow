
export const  scaleDimensions = (width: number, height: number, scale: number) =>  {

    let newWidth, newHeight;
    if (scale < 0) {
        newWidth = width / Math.abs(scale);
        newHeight = height / Math.abs(scale);
    } else {
        newWidth = width * scale;
        newHeight = height * scale;
    }

    return { width: newWidth, height: newHeight };
}