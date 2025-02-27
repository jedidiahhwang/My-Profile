require('dotenv').config()
const {CONNECTION_STRING} = process.env
const Sequelize = require('sequelize')

// you wouldn't want to rejectUnauthorized in a production app, but it's great for practice
const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres', 
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

module.exports = {
    seed: (req, res) => {
        sequelize.query(`
        drop table if exists paintings;
        drop table if exists profile cascade;
        drop table if exists about_me cascade;
        drop table if exists social_platform cascade;

        create table profile (
            profile_id serial primary key, 
            first_name varchar(100), 
            last_name varchar(100), 
            email varchar(50), 
            phone_number varchar(15),
            profile_title varchar , 
            address varchar
        );
        
        create table social_platform (
            id serial primary key, 
            profile_id integer references profile(profile_id), 
            url varchar, 
            mode varchar
        ); 

        create table about_me (
            id serial primary key,  
            profile_id integer references profile(profile_id),  
            description varchar
        );

        insert into profile (first_name, last_name, email, phone_number, profile_title, address)
        values('Reshma', 'Gayakwad','reshma@gmail.com', '123 456 7890', 'Stroke Of Art', 'MINNEAPOLIS');
        
        insert into social_platform (profile_id, url, mode)
        values (1, 'https://www.facebook.com/profile.php?id=100063097285303', 'FaceBook'),
        (1, 'https://www.instagram.com/', 'Insta'),
        (1, 'https://www.pinterest.com/business/hub/', 'Pinterest');
         
        insert into about_me (profile_id, description)
        values(1, 'We all have different ways of expressing ourselves and mine is through Art. Art promotes social development,creativity and self worth.'),
        (1, 'Hi, I am Reshma, self-trained Artist, born and brought up in INDIA. As a kid,I loved to transform any piece of cloth into an interesting and colorfull one with my skills. Now I not only paint on clothes but also on canvas. once I had been to the Art Exhibition that inspired me to keep my spirit of painting alive. Then I switched to Acrylic Painting on canvas.Painting has always been my passion'),        
        (1, 'Since my husband works in United States, we had to move to Minnesota. As a proud mother of two kids it has always been a constant struggle to keep my passion alive.Now that my kids are growing up, they motivate me to work harder, and thats how I am able to follow my dreams, and be a role model to my kids.I am a keen learner and I stronly belive in the fact that there's no end to learning, I like to take risks and try out new patterns. I usually work from my private studio.As an Artist inspiration comes to me from my parents,My Artwork is unique I do not believe in sticking to one style or one pattern.'),
        (1, 'Why box yourself when there is so much to explore!!!!'),
        (1, 'Thank you for taking time to know me.');

        create table paintings (
            id serial primary key, 
            profile_id integer references profile(profile_id),  
            name varchar(250), 
            img_url varchar ,
            buy_it_link varchar, 
            price varchar,
            description varchar
        );

        insert into paintings (profile_id, name, img_url, buy_it_link, price, description)
        values (1, 'Lord Ganesha','https://i.etsystatic.com/25758425/r/il/e4152f/2616960756/il_1140xN.2616960756_4963.jpg', 'https://www.etsy.com/listing/879732396/lord-ganesha-painting-original-ganesha?click_key=f07513b6dbf7d15f88914dc7884e34aad7c9711a%3A879732396&click_sum=eebcebb6&ref=shop_home_active_11&frs=1', '$100','Ganesh Painting, Lord Ganesha Acrylic Painting, Ganesha wall Art
        - Hand made Painting
        - Original Painting
        - Painted on Stretched canvas using artist quality acrylic paint
        - Varnish coating has been applied to surface to protect the  painting from UV light, moisture and dust
        - size 18 by 24 inches
        - wire hanging attached on back of floating frame
        - ready to hang
        - sides painted
        - signed by me, the artist and year on the back
        - will be safely wrapped for delivery'),

          (1, 'Buddha', 
             'https://i.etsystatic.com/25758425/r/il/af02ec/3711467405/il_794xN.3711467405_1hr2.jpg',
             'https://www.etsy.com/listing/878610490/gautama-buddhabuddha-painting-buddha?click_key=bd85af9bea27653da96a23ee28daaeded98bf7e0%3A878610490&click_sum=3852fb7a&ref=shop_home_active_23&frs=1',
             '$200','Gautama Buddha ,Buddha Painting, Buddha Wall Art, Buddha Meditation Wall Art, Buddha Gift, Buddha Painting on Canvas

             - Hand made painting
             - Original painting
             - painted on stretched canvas, with artist quality acrylic paint
             - varnished protects from UV, moist
             - size 14 by 14
             - wire hanging rope attached on back of floating frame
             - ready to hang
             - signed by me, the artist and year on back
             - sides are painted
             - will be safely wrapped for delivery'),

          (1, 'Cheery Blossoms', 
            'https://i.etsystatic.com/25758425/r/il/200051/2617127130/il_794xN.2617127130_foj8.jpg',
            'https://www.etsy.com/listing/879756176/cherry-blossoms-painting-boat-painting?click_key=0ed463bb2913c62aa3bca4fac0f30455bd9932ea%3A879756176&click_sum=9b01e17d&ref=shop_home_active_8&frs=1',
            '$200', 'Cherry Blossom painting with Boat in sea

            - Hand made Painting
            - Original Painting
            - Painted on Stretched canvas using artist quality acrylic paint
            - Varnish coating has been applied to surface to protect the painting from UV light, moisture and
            dust
            - size 18 by 24 inches
            - wire hanging attached on back of floating frame
            - ready to hang
            - sides painted
            - signed by me, the artist and year on the back
            - will be safely wrapped for delivery'),

          (1, 'Minnehaha falls', 
              'https://i.etsystatic.com/25758425/r/il/c32cd2/2617155526/il_794xN.2617155526_rlyp.jpg',
              'https://www.etsy.com/listing/893687055/minnehaha-falls-water-fall-painting?click_key=57bdcb0095d8150502d6c3fd119e6d5f8a4b8ac2%3A893687055&click_sum=58dd8a23&ref=shop_home_active_10&frs=1',
              '$200','Minnehaha falls, water fall painting, Water fall Acrylic Painting, Wall Art

              - Hand made Painting
              - Original Painting
              - Painted on Stretched canvas using artist quality acrylic paint
              - Varnish coating has been applied to surface to protect the painting from UV light, moisture and
              dust
              - size 18 by 24 inches
              - wire hanging attached on back of floating frame
              - ready to hang
              - sides painted
              - signed by me, the artist and year on the back
              - will be safely wrapped for delivery'),

          (1, 'Waterfall in cave', 
              'https://i.etsystatic.com/25758425/r/il/379d91/2664860305/il_794xN.2664860305_ndm1.jpg',
               'https://www.etsy.com/listing/879776720/sunrays-waterfall-cave?click_key=57ce28c9ed1796acc2d61b4bcd6df0460a327876%3A879776720&click_sum=910cb182&ref=shop_home_active_21&frs=1',
              '$200','Sunrays From the cave with Waterfall

              - Hand made Painting
              - Original Painting
              - Painted on Stretched canvas using artist quality acrylic paint
              - Varnish coating has been applied to surface to protect the painting from UV light, moisture and
              dust
              - size 18 by 24 inches
              - wire hanging attached on back of floating frame
              - ready to hang
              - sides painted
              - signed by me, the artist and year on the back
              - will be safely wrapped for delivery'),

          (1, 'Flower', 
              'https://i.etsystatic.com/25758425/r/il/06223e/2617170840/il_794xN.2617170840_o4n2.jpg',
               'https://www.etsy.com/listing/879769884/flower-painting-flower-wall-art-flower?click_key=dc268040070792e5062db2065f9083fdf6371c6e%3A879769884&click_sum=7af6d282&ref=shop_home_active_22&frs=1',
               '$120','Flower painting, flower wall Art, Flower Acrylic painting

               - Hand made Painting
               - Original Painting
               - Painted on Stretched canvas using artist quality acrylic paint
               - Varnish coating has been applied to surface to protect the painting from UV light, moisture and
               dust
               - size 18 by 24 inches
               - wire hanging attached on back of floating frame
               - ready to hang
               - sides painted
               - signed by me, the artist and year on the back
               - will be safely wrapped for delivery'),

          (1, 'Buddha',
              'https://i.etsystatic.com/25758425/r/il/9e0566/2898344871/il_794xN.2898344871_ollb.jpg',
               'https://www.etsy.com/listing/958045449/buddha-paintingbuddha-wall-art-buddha?click_key=8dc97ce771c47331a73a907a496da5826b0b85e9%3A958045449&click_sum=11c11056&ref=shop_home_active_24&frs=1',
               '$200','Buddha painting ,Buddha wall Art, Buddha Meditation wall décor, Buddha Gift, Buddha Painting
               on Canvas, Buddha wall Art
               - Hand made Painting
               - Original Painting
               - Painted on Stretched canvas using artist quality acrylic paint
               - Varnish coating has been applied to surface to protect the painting from UV light, moisture and
               dust
               - size 18 by 24 inches
               - wire hanging attached on back of floating frame
               - ready to hang
               - sides painted
               - signed by me, the artist and year on the back
               - will be safely wrapped for delivery'),

          (1, 'Welcome', 
              'https://i.etsystatic.com/25758425/r/il/31b680/2950374425/il_794xN.2950374425_p06e.jpg',
               'https://www.etsy.com/listing/880079886/wel-come-paintingwelcome-wall-artwelcome?click_key=742a6e85ecb4812fde895330d1a362485a1d26f9%3A880079886&click_sum=5f464133&ref=shop_home_active_19&frs=1',
                '$70','Welcome Painting, Welcome Wall Art, Welcome Gift, Welcome Painting on Canvas, Welcome Sunrise Painting

                - Hand made Painting
                - Original Painting
                - Painted on Stretched canvas using artist quality acrylic paint
                - Varnish coating has been applied to surface to protect the painting from UV light, moisture and
                dust
                - size 10 by 20 inches
                - wire hanging attached on back of floating frame
                - ready to hang
                - sides painted
                - signed by me, the artist and year on the back
                - will be safely wrapped for delivery'),
    
          (1, 'Sunflower', 
                'https://i.etsystatic.com/25758425/r/il/0e2b42/2698274219/il_794xN.2698274219_ddq3.jpg',
                'https://www.etsy.com/listing/902105277/sunflower-in-black-and-white-with-bokeh?click_key=614e38af8f8f7dd82aa6cba12adc9334434a8b69%3A902105277&click_sum=c3d420d5&ref=shop_home_active_6&frs=1',
                '$100','Sunflower Painting, sunflower painting, sunflower wall art

                - Hand made Painting
                - Original Painting
                - Painted on Stretched canvas using artist quality acrylic paint
                - Varnish coating has been applied to surface to protect the painting from UV light, moisture and
                dust
                - size 24 by 18 inches
                - wire hanging attached on back of floating frame
                - ready to hang
                - sides painted
                - signed by me, the artist and year on the back
                - will be safely wrapped for delivery'),

          (1, 'Horse', 
                'https://i.etsystatic.com/25758425/r/il/864ac2/2664749665/il_794xN.2664749665_2nnd.jpg',
                'https://www.etsy.com/listing/879746644/horse-painting-horse-acrylic-painting?click_key=51cdd1f3a82f83c2e86247c75313a96b3f39df33%3A879746644&click_sum=4bcdf8ec&ref=shop_home_active_9&frs=1',
                '$150','Horse Painting, , Horse Acrylic painting, Sun set Horse painting, Horse wall art

                - Hand made Painting
                - Original Painting
                - Painted on Stretched canvas using artist quality acrylic paint
                - Varnish coating has been applied to surface to protect the painting from UV light, moisture and
                dust
                - size 18 by 24 inches
                - wire hanging attached on back of floating frame
                - ready to hang
                - sides painted
                - signed by me, the artist and year on the back
                - will be safely wrapped for delivery');


        `).then(() => {
            console.log('DB seeded!')
            res.sendStatus(200)
        }).catch(err => console.log('error seeding DB', err))
    }
}
