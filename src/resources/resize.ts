import { IResizeData } from "@/utils/types/types";

export const resize = (img: HTMLDivElement, resizer: HTMLDivElement, info: HTMLDivElement) => {

    let imgWidthVar: number;

    const resizeData: IResizeData = {
        tracking: false,
        startCursorScreenX: null,
        imgStartWidth: null,
        imgMaxWidth: img.offsetWidth, // info element shrinks; cannot grow larger than original width
        imgMinWidth: 350,
        infoStartWidth: null,
        infoMaxWidth: 1200,
        infoMinWidth: info.offsetWidth, // info element expands, cannot shrink past original width
    };

    resizer.addEventListener('mousedown', event => {
        event.preventDefault();
        event.stopPropagation();

        resizeData.imgStartWidth = img.offsetWidth;
        resizeData.infoStartWidth = info.offsetWidth;
        resizeData.startCursorScreenX = event.screenX;
        resizeData.tracking = true;
    });

    document.addEventListener('mousemove', event => {
        if (resizeData.tracking) {
            if (
                resizeData.startCursorScreenX
                && resizeData.imgStartWidth
                && resizeData.imgMaxWidth
                && resizeData.infoStartWidth
                && resizeData.infoMaxWidth
            ) {
                const cursorScreenXDelta = event.screenX - resizeData.startCursorScreenX;

                let newImgWidth = Math.min(resizeData.imgStartWidth + cursorScreenXDelta, resizeData.imgMaxWidth);

                newImgWidth = Math.max(resizeData.imgMinWidth, newImgWidth);
                imgWidthVar = newImgWidth;

                let newInfoWidth = Math.min(window.innerWidth - newImgWidth - resizer.offsetWidth, resizeData.infoMaxWidth);

                newInfoWidth = Math.max(resizeData.infoMinWidth, newInfoWidth);

                img.style.width = newImgWidth + 'px';
                info.style.width = newInfoWidth + 'px';
            }
        }
    })

    window.addEventListener('resize', () => {
        // Set divs to 100% width if screen width is mobile size ($breakpoint-small in sass _variable)
        if (window.innerWidth < 576) {
            img.style.width = 100 + '%';
            info.style.width = 100 + '%';
        }
        else if (resizeData.infoStartWidth && resizeData.infoMaxWidth) {

            let newInfoWidth = Math.min(window.innerWidth - imgWidthVar - resizer.offsetWidth, resizeData.infoMaxWidth);
            
            info.style.width = newInfoWidth + 'px';
        }
    })

    document.addEventListener('mouseup', (event) => {
        if (resizeData.tracking) {
            // Stop tracking
            resizeData.tracking = false;
        }
    });
}