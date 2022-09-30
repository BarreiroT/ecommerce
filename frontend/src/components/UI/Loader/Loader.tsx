import './Loader.css';

export const Loader = ({ center, parentCenter, small }: { center?: boolean, parentCenter?: boolean, small?: boolean }) => {
    const LoadingCircle = (
        <div className={small ? "small-lds" : "lds-ring"}>
            <div>
            </div>
            <div>
            </div>
            <div>
            </div>
            <div>
            </div>
        </div>
    )

    const LoadingCenter = (
        <div className={center ? "loading-center" : "parent-center"}>
            {LoadingCircle}
        </div>
    )

    if(center || parentCenter) return LoadingCenter;

    return LoadingCircle;
}