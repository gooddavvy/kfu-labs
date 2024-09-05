const calculateProgress = (
    initial: number,
    current: number,
    target: number
) => {
    if (initial === target) {
        return initial === current ? 100 : 0;
    }

    const progress =
        ((initial > target ? initial - current : current - initial) /
            Math.abs(target - initial)) *
        100;

    return Math.min(Math.max(progress, 0), 100);
};

export default calculateProgress;