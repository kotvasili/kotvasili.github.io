'use client'
import {motion, Variants} from "framer-motion";
import {Asset} from "contentful";
import {CustomImage} from "@/app/conponents/CustomImage";
import styles from './HeroCards.module.sass'
const config = [
   {rotate: '-28deg'},
   {rotate: '-17.2deg'},
   {rotate: '-16deg'},
   {rotate: '28deg'},
   {rotate: '17.2deg'},
   {rotate: '16deg'},
   {rotate: '11.2deg'},
   {rotate: '18.8deg'},
   {rotate: '20deg'},
]

const parentVariant: Variants = {
   initial: { opacity: 1 },
   animate: { opacity: 0 }
};

export const HeroCards = ({images}: {images: Asset[]}) => {
   return <motion.div className={styles.hero_cards}>
      <motion.div className={styles.hero_cards_inner}
                  initial={{ opacity: 1, scale: 1}}
                  transition={{ duration: 0.4, delay: 3}}
      >
      {images.map((image, index) => <motion.div
          key={image.sys.id}
          className={styles.hero_cards_card}
          initial={{ opacity: 0, translateX: -((index + 0.5) * 100), translateY: index * 50, rotate: '-45deg'}}
          animate={{ opacity: 1, translateX: 0, translateY: 0 , rotate: config[index].rotate}}
          transition={{ duration: 0.3, delay: index * 0.05, type: "spring", stiffness: 50 }}
      >
         <CustomImage {...image}/>
      </motion.div>)}
      </motion.div>
   </motion.div >
}

