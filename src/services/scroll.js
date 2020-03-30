const noScroll = () => {
    window.scroll(0,0);
};

export const disableScroll = () => {
    window.addEventListener('scroll', noScroll);
};

export const enableScroll = (node) => {
    window.removeEventListener('scroll', noScroll);
};
