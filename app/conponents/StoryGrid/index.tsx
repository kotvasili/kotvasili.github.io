import styles from './StoryGrid.module.sass'
import {IStoryCard} from "@/contentful/generated/types";
import {StoryGridItem} from "@/app/conponents/StoryGrid/StoryGridItem";
import {Bubble} from "@/app/conponents/Bubble";
export const StoryGrid = ({stories}: {stories: IStoryCard[]}) => {
    return <div className={styles.story_grid} id='story'>
        {stories.map(story => <StoryGridItem key={story.sys.id} {...story.fields}/>)}
        <svg xmlns="http://www.w3.org/2000/svg" width="1372" viewBox='0 0 1372 3500' fill="none" preserveAspectRatio="xMidYMin meet">
            <g opacity=".4">
                <path stroke="#fff" strokeWidth="2.37" d="m694.16 864.36.11-.23c38.52-75.07-14.1-164.62-137.23-284.96C433.9 458.83 10.5 397.1 10.5 182.5 10.5 32.54 344.41-32.95 476 61c59.74 42.66 108.27 205.55 176.16 174.88 49.71-22.46 64.36-225.7 217.08-225.7 164.17 0 262.68 91.94 344.76 157.37M694.16 864.36c-38.76 74.95-211.97 125.62-194.08 66.93 25.63-84.1 128.07-60.87 194.08-66.93Zm0 0c308.81-28.33 166.69-78.53 277.23-119.52 141.1-52.32 286.4-154.02 369.39-109.74 82.99 44.27-101.91 293.51-165.72 400.37-115.97 194.18-760.32 274.72-782.84 462.03-14.74 122.64 372.57-17 461.28 108 76.99 108.49 166.06 202.6 248 160 345.15-224.61 387.31 506.26-491 204-273.17-94.01-400.55 323.24-260.5 467 223.91 229.84 706.21 40.62 895.01 270.05 139.68 169.73 114.61 480.64-46.01 704.95-187.53 261.89-706.51-62.14-791.5 232-97.07 335.96 883.5 144.5 791.5 488" shapeRendering="crispEdges"/>
            </g>
        </svg>
        <Bubble className='bubble-4 rot50 op06 blur10' offset={15}/>
        <Bubble className='bubble-5 rot100' offset={20}/>
        <Bubble className='bubble-6 rot50 blur10 op05' offset={10} />
        <Bubble className='bubble-7 rot40' offset={40}/>
        <Bubble className='bubble-8 rot50 blur10' offset={10}/>
    </div>
}
