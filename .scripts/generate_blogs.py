import os
import re

# Define the blog posts content database
blogs_db = [
    {
        "filename": "blog-coughton-court.html",
        "title": "The Ultimate Guide to Visiting Coughton Court (Just 5 Minutes Away)",
        "keyword": "Coughton Court visitor guide",
        "description": "Plan your trip with our ultimate Coughton Court visitor guide. Discover the history of this Tudor manor, gardens, and visiting tips just 5 minutes from Kings Court Hotel.",
        "image": "assets/images/gallery1/exterior/compressed-kings-court-3-1.jpg",
        "read_time": "5 min read",
        "date": "May 2026",
        "meta_dist": "1.5 miles from hotel",
        "intro": "If you're seeking a historical escape that feels almost within touching distance of your room at Kings Court Hotel, look no further than Coughton Court. Located just five minutes away in Alcester, this majestic Tudor manor house stands as one of Warwickshire's most remarkable treasures. Our complete Coughton Court visitor guide will prepare you for a wonderful journey through centuries of heritage, secrets, and horticulture.",
        "body": """
        <h2>Tudor Splendour and Gunpowder Plot Secrets</h2>
        <p>For over 600 years, Coughton Court has been the home of the Throckmorton family, one of England's most prominent Catholic dynasties. As you walk through the grand gatehouse, you're not just entering a house; you're stepping into a hotbed of Tudor intrigue. The house played a central, secret role in the infamous Gunpowder Plot of 1605. It was in the Throckmorton family's private chambers here that the conspirators' families waited anxiously for news of Guy Fawkes' attempt to blow up Parliament.</p>
        <p>Today, the house displays a rich collection of family portraits, Catholic relics (including the chemise worn by Mary, Queen of Scots at her execution), and hidden priest holes that allowed Catholic clergy to hide during times of persecution.</p>

        <h2>The Walled Gardens: A Horticultural Masterpiece</h2>
        <p>Beyond the history, Coughton Court is famous for its award-winning gardens. The walled garden features a breathtaking rose labyrinth, showcasing hundreds of varieties of historic and contemporary English roses. In the summer months, the scent is absolutely intoxicating.</p>
        <ul>
            <li><strong>The Rose Labyrinth:</strong> A circular walkway containing standard, climbing, and shrub roses.</li>
            <li><strong>The Walled Garden:</strong> A structured space filled with herbaceous borders, fruit trees, and water features.</li>
            <li><strong>The Orchard:</strong> A tranquil meadow with traditional apple and pear trees, ideal for a quiet afternoon stroll.</li>
        </ul>

        <blockquote>"Coughton Court is more than a historic house; it's a living archive of English Catholic history, surrounded by some of the most romantic gardens in the Midlands."</blockquote>

        <h2>Visitor Essentials &amp; Practical Tips</h2>
        <p>To help you plan, here are our top tips for visiting Coughton Court:</p>
        <ul>
            <li><strong>Opening Times:</strong> Generally open from March to October, Wednesday through Sunday. The house opens at 11:00 AM, while the gardens and tea room open at 10:00 AM.</li>
            <li><strong>Facilities:</strong> There is a lovely National Trust tea room serving hot drinks, light lunches, and classic cream teas. A well-stocked shop sells local produce and gifts.</li>
            <li><strong>Accessibility:</strong> The ground floor of the house and the majority of the gardens are fully accessible. Wheelchairs are available for loan.</li>
        </ul>

        <h2>Getting There from Kings Court Hotel</h2>
        <p>Coughton Court is located just 1.5 miles north of Kings Court Hotel on the A435. It takes less than 5 minutes by car, and ample free parking is available for National Trust members and ticket holders. Alternatively, you can enjoy a pleasant 30-minute walk through the Warwickshire countryside along the local footpaths.</p>
        """
    },
    {
        "filename": "blog-ragley-hall.html",
        "title": "Behind the Gates of Ragley Hall: What to See and Do This Year",
        "keyword": "Ragley Hall events and tour",
        "description": "Get the complete Ragley Hall events and tour guide. Explore the stunning Palladian architecture, estate gardens, and seasonal events near Alcester.",
        "image": "assets/images/gallery1/exterior/compressed-kings-court-46.jpg",
        "read_time": "6 min read",
        "date": "June 2026",
        "meta_dist": "3 miles from hotel",
        "intro": "As you drive through the gates of Ragley Hall, the sheer scale of this stunning Palladian mansion takes your breath away. The ancestral home of the Marquess of Hertford, Ragley Hall is one of Warwickshire's grandest stately homes. Just 3 miles from Kings Court Hotel, it offers a fascinating glimpse into aristocratic life, magnificent art, and a packed calendar of outdoor events. Here is what to see and do on your Ragley Hall events and tour this year.",
        "body": """
        <h2>Marvel at Magnificent Palladian Architecture</h2>
        <p>Designed by the renowned architect Robert Hooke in 1680, Ragley Hall is a textbook example of classical Palladian architecture. The Great Hall is the crown jewel of the interior, featuring spectacular baroque plasterwork by James Gibbs that rises over 40 feet to the ceiling. As you walk through the state rooms, you'll be surrounded by an extraordinary collection of fine paintings, including works by Reynolds, Gainsborough, and modern murals by Graham Rust.</p>
        <p>The library houses over 10,000 historic volumes, while the South Dining Room displays exquisite porcelain and antique furniture that has been in the Hertford family for generations.</p>

        <h2>Explore the Walled Gardens and Adventure Park</h2>
        <p>Ragley's grounds extend over 450 acres of parkland designed by the legendary landscape architect Capability Brown. The gardens offer something for every visitor:</p>
        <ul>
            <li><strong>The Walled Garden:</strong> A beautifully restored space containing geometric flower beds and heritage fruit trees.</li>
            <li><strong>The Adventure Wood:</strong> An exciting play area for children, complete with a 3D maze, slides, and climbing frames.</li>
            <li><strong>The Boating Lake:</strong> Rent a boat or enjoy a peaceful walk around the lake's perimeter to spot local waterfowl.</li>
        </ul>

        <blockquote>"Standing on the steps of Ragley Hall, looking out across the Capability Brown lake and parkland, you feel transported back to the golden age of English country estates."</blockquote>

        <h2>Unmissable Seasonal Events</h2>
        <p>Ragley Hall hosts some of the region's biggest outdoor festivals, car shows, and sporting events throughout the year. When planning your Ragley Hall events and tour, check the local calendar for highlights such as:</p>
        <ul>
            <li><strong>The Game Fair:</strong> A massive celebration of British countryside sports and agriculture.</li>
            <li><strong>Classic Car Rallies:</strong> Hundreds of vintage cars displayed against the backdrop of the mansion.</li>
            <li><strong>Outdoor Cinema &amp; Concerts:</strong> Enjoy live music or films under the stars on the sweeping lawns.</li>
        </ul>

        <h2>Visitor Tips for Kings Court Guests</h2>
        <p>Ragley Hall is located just south of Alcester, a 7-minute drive from Kings Court Hotel. While the house itself is only open to the public on specific dates for guided tours and events, the parkland and gardens are open regularly throughout the spring and summer season. We recommend checking their official website before setting off to secure tour tickets.</p>
        """
    },
    {
        "filename": "blog-alcester-heritage.html",
        "title": "Exploring the Roman History of Alcester: A Day at the Heritage Centre",
        "keyword": "Roman Alcester history things to do",
        "description": "Dive into Roman Alcester history things to do. Spend a day at the Alcester Heritage Centre discovering archeological finds, pottery, and local heritage.",
        "image": "assets/images/gallery1/dining/compressed-kings-court-43.jpg",
        "read_time": "5 min read",
        "date": "April 2026",
        "meta_dist": "1 mile from hotel",
        "intro": "Today, Alcester is a peaceful market town famous for its Tudor and Georgian high street. However, beneath the modern pavement lies a bustling Roman town named Alauna. Established in the 1st century AD, Alauna was a vital military and trading outpost. If you are looking for Roman Alcester history things to do, your first stop must be the Alcester Roman Heritage Centre, situated just a 20-minute walk or a 3-minute drive from Kings Court Hotel.",
        "body": """
        <h2>Alauna: The Hidden Roman Metropolis</h2>
        <p>During the Roman occupation of Britain, Alcester was one of the largest towns in the region, serving as a crossroads for major Roman roads, including Ryknild Street. It featured a large stone fort, a walled town centre, and sprawling suburbs filled with workshops, granaries, and temples. Archaeological digs over the last century have unearthed a treasure trove of artefacts that tell the story of daily Roman life in Warwickshire.</p>

        <h2>Discovering Finds at the Alcester Roman Heritage Centre</h2>
        <p>Located on Globe House, the Heritage Centre houses an interactive museum displaying local archaeological finds. It is the perfect family-friendly educational destination:</p>
        <ul>
            <li><strong>Pottery and Glassware:</strong> Admire beautifully preserved Samian ware imported from Gaul and delicate Roman glassware.</li>
            <li><strong>Roman Coinage:</strong> View the collection of bronze and silver coins that circulated in Alcester's markets 1,800 years ago.</li>
            <li><strong>Interactive Tudor House:</strong> Learn how the town's history transitioned from Roman settlement to Tudor market town.</li>
        </ul>

        <blockquote>"The Roman Heritage Centre brings the ancient citizens of Alauna to life. You can see the actual keys they used to lock their doors and the jewellery they wore."</blockquote>

        <h2>Top Roman History Things to Do in Alcester</h2>
        <p>Make a full day of your historical exploration with these local activities:</p>
        <ul>
            <li><strong>Visit the Heritage Centre:</strong> Open Tuesday through Friday (and Saturday mornings). Entrance is free, making it a great budget-friendly stop.</li>
            <li><strong>Take a Roman Town Walk:</strong> Grab a historical map from the heritage centre and walk the old boundaries of Ryknild Street and the River Arrow.</li>
            <li><strong>Explore Local Architecture:</strong> Spot how Roman stone blocks were reused in the foundations of medieval buildings around the high street.</li>
        </ul>

        <p>After a day of exploring Alcester's ancient roots, return to Kings Court Hotel to unwind with a modern craft ale by the fireplace in our cozy Twisted Boot Pub.</p>
        """
    },
    {
        "filename": "blog-stratford-itinerary.html",
        "title": "Walking in Shakespeare’s Footsteps: A 1-Day Stratford-upon-Avon Itinerary",
        "keyword": "1 day itinerary Stratford-upon-Avon",
        "description": "Follow this perfect 1 day itinerary Stratford-upon-Avon to walk in Shakespeare's footsteps. Visit birthplaces, theatres, and historic streets just 6 miles from Alcester.",
        "image": "assets/images/local_attractions/royal_shakesappear.jpg",
        "read_time": "8 min read",
        "date": "July 2026",
        "meta_dist": "6 miles from hotel",
        "intro": "Stratford-upon-Avon is one of the most culturally significant towns in the world, serving as the birthplace and final resting place of William Shakespeare. Located just a 15-minute drive (6 miles) from Kings Court Hotel, it makes for the ultimate day out. To help you make the most of your visit, we've designed this ultimate 1 day itinerary Stratford-upon-Avon, guiding you through birthplaces, historic riverfronts, and world-renowned theatre.",
        "body": """
        <h2>9:00 AM – Morning: Birthplaces and Tudor High Streets</h2>
        <p>Start your day early on Henley Street at <strong>Shakespeare's Birthplace</strong>. Step inside the half-timbered house where the world's most famous playwright grew up. Walk through the preserved rooms, hear stories from costumed actors, and enjoy live performances in the garden.</p>
        <p>From there, stroll down High Street past beautiful Tudor buildings, including Harvard House, and head toward the stunning <strong>Shakespeare's New Place</strong>, the site of his final family home where he wrote many of his famous plays.</p>

        <h2>12:30 PM – Lunch by the River Avon</h2>
        <p>Walk down to the Waterside and enjoy a relaxing lunch at one of the excellent cafes or restaurants overlooking the river. Watch the narrowboats pass through the canal locks or cross the historic tramway bridge for a panoramic view of the town.</p>

        <h2>2:00 PM – Afternoon: The Holy Trinity Church &amp; RSC Theatre</h2>
        <p>Following the riverside path, make your way to <strong>Holy Trinity Church</strong>. This beautiful parish church is the final resting place of William Shakespeare and his wife Anne Hathaway. You can view his gravestone and the famous curse written upon it to warn grave-robbers.</p>
        <p>Head back to the <strong>Royal Shakespeare Theatre</strong>. Take a backstage tour to see the costume departments, explore the exhibition gallery, or climb the tower for a 36-degree view of Warwickshire.</p>

        <blockquote>"To stand before Shakespeare's grave in Holy Trinity Church and then watch his plays performed hours later by the RSC is an unforgettable experience."</blockquote>

        <h2>Summary Checklist for Your 1-Day Itinerary</h2>
        <ol>
            <li><strong>Shakespeare's Birthplace:</strong> Historic Tudor childhood home.</li>
            <li><strong>Shakespeare's New Place:</strong> Beautiful gardens on the site of his final home.</li>
            <li><strong>Holy Trinity Church:</strong> Shakespeare's grave and parish church.</li>
            <li><strong>Royal Shakespeare Theatre:</strong> Home of the RSC.</li>
            <li><strong>River Avon Stroll:</strong> Riverside walks and rowing boats.</li>
        </ol>

        <h2>Getting There from Kings Court Hotel</h2>
        <p>Stratford-upon-Avon is a straightforward 6-mile drive from Kings Court Hotel. We recommend parking at the Bridgeway Multi-Storey Car Park, which provides easy access to the main pedestrian areas. Taxis are also readily available from the hotel reception.</p>
        """
    },
    {
        "filename": "blog-anne-hathaway.html",
        "title": "The Romance of Anne Hathaway’s Cottage: A Visitor’s Companion",
        "keyword": "Anne Hathaway's Cottage visiting tips",
        "description": "Read our essential Anne Hathaway's Cottage visiting tips. Discover the romantic history of this thatched cottage, its orchards, and scenic trails in Shottery.",
        "image": "assets/images/local_attractions/royal_shakesappear.jpg",
        "read_time": "5 min read",
        "date": "August 2026",
        "meta_dist": "5.5 miles from hotel",
        "intro": "Tucked away in the hamlet of Shottery, just a short distance from the centre of Stratford-upon-Avon, sits perhaps the most photographed cottage in England. Anne Hathaway's Cottage was the childhood home of William Shakespeare's wife, and it remains a beautiful monument to Elizabethan romance. Read our essential Anne Hathaway's Cottage visiting tips to help plan your romantic trip back in time, just a 15-minute drive from Kings Court Hotel.",
        "body": """
        <h2>A Romantic Elizabethan Love Story</h2>
        <p>Before their marriage, William Shakespeare walked the footpaths from Stratford to Shottery to court his future bride, Anne Hathaway. The cottage itself is a spacious, nine-roomed Tudor farmhouse dating back to the 15th century. It features original timber framing, low ceilings, and the actual 'Hathaway Bed' and courting settle where William and Anne would have sat together.</p>
        <p>The house remained in the Hathaway family for generations, which preserved the unique furniture, household utensils, and historical layout of the home.</p>

        <h2>Stroll Through Walled Gardens and Orchards</h2>
        <p>The cottage is set within nine acres of stunning grounds, including formal cottage gardens, orchards, and woodland trails. Highlights of the gardens include:</p>
        <ul>
            <li><strong>The Shakespearean Sculpture Garden:</strong> Explore bronze sculptures depicting characters from Shakespeare's plays hidden amongst the foliage.</li>
            <li><strong>The Waved Garden Trail:</strong> Follow the path lined with traditional cottage flowers, lavender, and herbs that Anne would have grown for cooking and medicine.</li>
            <li><strong>The Heritage Orchard:</strong> A peaceful orchard growing old English varieties of apples and pears.</li>
        </ul>

        <blockquote>"Anne Hathaway's Cottage is the epitome of the quintessential English thatched cottage, wrapped in the history of one of the world's most famous marriages."</blockquote>

        <h2>Essential Anne Hathaway's Cottage Visiting Tips</h2>
        <ul>
            <li><strong>Book Online:</strong> We recommend buying tickets online in advance to secure your entry slot. Joint tickets are available if you plan to visit Shakespeare's Birthplace on the same day.</li>
            <li><strong>Allow Enough Time:</strong> Allocate at least 1.5 to 2 hours to fully explore both the cottage interior and the expansive gardens.</li>
            <li><strong>Best Time to Visit:</strong> Late spring and summer are particularly beautiful when the roses and cottage flowers are in full bloom.</li>
        </ul>

        <p>After your stroll through these romantic gardens, head back to Kings Court Hotel to enjoy a traditional Afternoon Tea in our private walled gardens.</p>
        """
    },
    {
        "filename": "blog-kinwarton-dovecote.html",
        "title": "Hidden Medieval History: Why You Should Visit the Kinwarton Dovecote",
        "keyword": "Kinwarton Dovecote National Trust",
        "description": "Discover the Kinwarton Dovecote National Trust guide. Visit this rare circular 14th-century medieval stone dovecote located just a short walk from Alcester.",
        "image": "assets/images/gallery1/exterior/compressed-kings-court-2.jpg",
        "read_time": "4 min read",
        "date": "March 2026",
        "meta_dist": "2 miles from hotel",
        "intro": "While Warwickshire is famous for its grand castles and stately homes, it is often the smaller, hidden treasures that tell the most surprising stories. The Kinwarton Dovecote National Trust property is one such gem. Located just 2 miles from Kings Court Hotel on the outskirts of Alcester, this rare 14th-century circular stone dovecote remains fully intact. Here is why you should add this architectural wonder to your local sightseeing itinerary.",
        "body": """
        <h2>What is a Dovecote?</h2>
        <p>In medieval England, dovecotes were symbols of wealth and prestige, constructed by lords of the manor and monasteries to house pigeons and doves. These birds provided a vital source of fresh meat, eggs, and fertiliser during the cold winter months when livestock was difficult to keep. Because of their value, dovecotes were built like small fortresses to protect the birds from predators and thieves.</p>

        <h2>An Architectural Wonder: Inside the Kinwarton Dovecote</h2>
        <p>Built in the 1300s for the Abbot of Evesham, the Kinwarton Dovecote is a masterpiece of medieval design. Its circular walls are over three feet thick, constructed from local limestone. The interior is absolutely stunning:</p>
        <ul>
            <li><strong>Nest Boxes:</strong> Over 600 individual L-shaped nest holes line the interior walls from floor to ceiling.</li>
            <li><strong>The Potence:</strong> A massive, rotating wooden ladder system (known as a potence) that pivots on a central post, allowing the keeper to access every nest box to collect eggs and clean the dovecote.</li>
            <li><strong>The Conical Roof:</strong> A beautiful timber-framed roof topped with a lantern that allowed the birds to fly in and out.</li>
        </ul>

        <blockquote>"Step inside the Kinwarton Dovecote and look up. The geometry of the 600 nest boxes wrapping around the circular stone wall is a stunning sight."</blockquote>

        <h2>Tips for Visiting Kinwarton Dovecote</h2>
        <ul>
            <li><strong>Opening:</strong> Open daily during daylight hours. Admission is free, making it a perfect quick historical stop.</li>
            <li><strong>How to Access:</strong> The dovecote is located in a quiet farm lane. A short footpath leads from the road to the structure.</li>
            <li><strong>Combine with a Walk:</strong> It is situated along the Heart of England Way, making it a perfect destination for a countryside walk from Kings Court Hotel.</li>
        </ul>

        <p>A visit to this quiet National Trust property offers a peaceful moment of reflection and a deep connection to Warwickshire's medieval farming heritage.</p>
        """
    },
    {
        "filename": "blog-day-trips-alcester.html",
        "title": "Day Trips from Alcester: Exploring Warwick Castle and Beyond",
        "keyword": "Day trips from Alcester Warwickshire",
        "description": "Plan your next day trips from Alcester Warwickshire. Find guides to Warwick Castle, the Cotswolds, and other spectacular local attractions near Alcester.",
        "image": "assets/images/local_attractions/warwick castle.webp",
        "read_time": "6 min read",
        "date": "September 2026",
        "meta_dist": "Various locations",
        "intro": "Alcester is not only a charming historic town in its own right, but it also serves as the perfect base for exploring the heart of England. Nestled between Shakespeare Country, the Cotswolds, and medieval strongholds, Kings Court Hotel offers unparalleled access to the region. Here are our top recommended day trips from Alcester Warwickshire, including Warwick Castle, honey-stone villages, and grand ruins.",
        "body": """
        <h2>1. Warwick Castle: 1,000 Years of Jaw-Dropping History</h2>
        <p>Located just 19 miles (25 minutes) from Alcester, Warwick Castle is one of Britain's finest medieval fortresses. Developed by William the Conqueror in 1068, it sits majestically on a bend of the River Avon. It offers a packed day of family entertainment, including jousting tournaments, falconry displays, the world's largest working trebuchet, and access to the towers and ramparts.</p>
        <p>Stroll through the beautiful peacock gardens, explore the grand state rooms, or face your fears in the castle dungeon.</p>

        <h2>2. Kenilworth Castle and Elizabeth I's Walled Garden</h2>
        <p>Just a short drive beyond Warwick lies the spectacular red-sandstone ruins of Kenilworth Castle. Famous for the royal romance between Queen Elizabeth I and Robert Dudley, the castle features a beautifully reconstructed Elizabethan garden, a grand gatehouse, and dramatic tower ruins that offer panoramic views across the Warwickshire countryside.</p>

        <h2>3. A Tour of the Cotswolds Honey-Stone Villages</h2>
        <p>The northern edge of the Cotswolds Area of Outstanding Natural Beauty begins just 15 miles south of Alcester. Spend a day driving through winding lanes to visit picture-postcard villages such as:</p>
        <ul>
            <li><strong>Chipping Campden:</strong> Famous for its historic market hall and thatched cottages.</li>
            <li><strong>Broadway:</strong> Home to beautiful antique shops, art galleries, and the famous Broadway Tower.</li>
            <li><strong>Stow-on-the-Wold:</strong> A historic market town with cozy pubs and the famous church door framed by ancient yew trees.</li>
        </ul>

        <blockquote>"Alcester sits at the gateway to the best of England. You can explore a medieval castle in the morning, tour a Cotswold village in the afternoon, and be back at Kings Court in time for dinner."</blockquote>

        <h2>Practical Day Trips Checklist</h2>
        <ul>
            <li><strong>Warwick Castle:</strong> Ideal for families and history enthusiasts. (25 mins drive)</li>
            <li><strong>Kenilworth Castle:</strong> Great for romantic walks and ruins. (30 mins drive)</li>
            <li><strong>Broadway &amp; The Cotswolds:</strong> Perfect for shopping, scenery, and tea rooms. (30 mins drive)</li>
        </ul>
        """
    },
    {
        "filename": "blog-kings-court-history.html",
        "title": "A History of Kings Court: From Our 1800s Origins to a Modern Retreat",
        "keyword": "Historic hotels in Alcester",
        "description": "Learn the history of Kings Court Hotel, one of the premier historic hotels in Alcester. Explore our origins, architecture, and evolution into a luxury countryside retreat.",
        "image": "assets/images/gallery/compressed-kings-court-2.jpg",
        "read_time": "5 min read",
        "date": "October 2026",
        "meta_dist": "On-site",
        "intro": "When you stay at Kings Court Hotel, you aren't just booking a room; you are becoming part of a story that spans centuries. Our buildings, located in the historic hamlet of Kings Coughton, Alcester, have evolved from agricultural origins in the 1800s into one of the most beloved historic hotels in Alcester. Discover the history of our hotel, our architecture, and our transformation into a modern countryside retreat.",
        "body": """
        <h2>Our Origins: An 1800s Warwickshire Farmstead</h2>
        <p>The core of Kings Court Hotel dates back to the early 19th century, when the main building served as a traditional farmstead and manor barn in the heart of rural Warwickshire. Constructed from local red brick and oak timbers, the farm was a hub of agricultural life for the surrounding fields of Kings Coughton.</p>
        <p>If you look closely at the architecture in our restaurant and public lounge areas, you can still see the original wooden beams and structural brick arches that supported the farm buildings nearly 200 years ago.</p>

        <h2>The Evolution: Becoming a Stately Residence</h2>
        <p>As Alcester grew and transport links improved, the farmstead was converted into a private residential estate. Walled gardens were built to provide privacy, and the main house was expanded to include elegant Victorian and Georgian architectural features. The property was known for its beautiful courtyard layout, which remains the physical and social heart of the hotel today.</p>

        <h2>Kings Court Today: A Modern Countryside Escape</h2>
        <p>In the late 20th century, the private residence was lovingly converted into a hotel. Great care was taken to preserve the historic character of the buildings while introducing the modern comforts that contemporary travellers expect. Today, the hotel offers:</p>
        <ul>
            <li><strong>61 En-Suite Bedrooms:</strong> Individually designed rooms that blend historic charm with modern amenities.</li>
            <li><strong>The Garden Dining Room:</strong> A contemporary restaurant celebrating local Warwickshire produce.</li>
            <li><strong>The Twisted Boot Pub:</strong> A traditional pub complete with oak beams, local ales, and a warm log fire.</li>
        </ul>

        <blockquote>"Our goal has always been to honour the history of these walls. We invite you to sit under the 19th-century beams, enjoy a local ale, and add your own chapter to the history of Kings Court."</blockquote>

        <p>Whether you are visiting for a wedding, a business conference, or a relaxing weekend getaway, we are proud to welcome you to our historic home.</p>
        """
    },
    {
        "filename": "blog-national-trust-warwickshire.html",
        "title": "The Best National Trust Properties in South Warwickshire",
        "keyword": "National Trust Warwickshire places to visit",
        "description": "Discover the best National Trust Warwickshire places to visit. Plan visits to Coughton Court, Charlecote Park, Packwood House, and more from Kings Court Hotel.",
        "image": "assets/images/local_attractions/cotswolds.png",
        "read_time": "6 min read",
        "date": "November 2026",
        "meta_dist": "Various locations",
        "intro": "South Warwickshire is blessed with some of the most spectacular historic houses, gardens, and parklands in the country, many of which are preserved by the National Trust. Kings Court Hotel in Alcester serves as the ideal hub for your exploration. Here is our curated guide to the best National Trust Warwickshire places to visit, all located within a short drive of the hotel.",
        "body": """
        <h2>1. Coughton Court: Tudor Heritage on Our Doorstep</h2>
        <p>Located just 5 minutes (1.5 miles) north of Kings Court Hotel, Coughton Court is a magnificent Tudor manor house that has been home to the Throckmorton family for 600 years. Famous for its connections to the Gunpowder Plot of 1605, the house features priest holes, royal relics, and an award-winning walled garden with a famous rose labyrinth.</p>

        <h2>2. Charlecote Park: A Victorian Treasure and Deer Park</h2>
        <p>Situated near Stratford-upon-Avon (12 miles from Alcester), Charlecote Park is a stunning Tudor-revival mansion set in a beautiful parkland designed by Capability Brown. The park is famous for its herd of fallow deer, which have roamed the estate for centuries. Legend has it that a young William Shakespeare was once caught poaching deer on this very property.</p>

        <h2>3. Packwood House: A Topiary Masterpiece</h2>
        <p>Located near Lapworth (15 miles from the hotel), Packwood House is a beautifully restored Tudor house famous for its spectacular Yew Garden. The garden features over 100 ancient yew trees clipped into shapes representing the Sermon on the Mount, creating a mystical and dramatic landscape that is a must-see for garden lovers.</p>

        <h2>4. Baddesley Clinton: A Moated Medieval Manor</h2>
        <p>Just a short drive from Packwood House sits Baddesley Clinton, a picturesque stone manor house surrounded by a quiet moat. Built in the 15th century, the house was a haven for persecuted Catholic priests during the Elizabethan era. It features three hidden priest holes, beautiful stained glass, and tranquil lakeside walks.</p>

        <blockquote>"Warwickshire's National Trust properties offer a journey through English history — from moated medieval manors to grand Victorian deer parks, all within easy reach of Alcester."</blockquote>

        <h2>National Trust Warwickshire Travel Guide Summary</h2>
        <ul>
            <li><strong>Coughton Court:</strong> Tudor secrets &amp; rose gardens (5 mins drive).</li>
            <li><strong>Charlecote Park:</strong> Deer park &amp; river walks (20 mins drive).</li>
            <li><strong>Packwood House:</strong> Topiary gardens &amp; Tudor interiors (25 mins drive).</li>
            <li><strong>Baddesley Clinton:</strong> Moated manor &amp; priest holes (25 mins drive).</li>
        </ul>
        """
    },
    {
        "filename": "blog-evesham-blossom.html",
        "title": "A Guide to the Vale of Evesham Blossom Trail",
        "keyword": "Evesham Blossom Trail dates and route",
        "description": "Find the Evesham Blossom Trail dates and route details. Explore 45 miles of stunning pink and white apple, plum, and pear tree blossoms in the Vale of Evesham.",
        "image": "assets/images/local_attractions/cotswolds.png",
        "read_time": "5 min read",
        "date": "February 2026",
        "meta_dist": "15 miles from hotel",
        "intro": "Every spring, the Vale of Evesham undergoes a breathtaking transformation. Thousands of acres of orchards burst into color, creating a canopy of delicate pink and white blossoms. The Evesham Blossom Trail is a world-famous 45-mile route guiding visitors through this spectacular seasonal display. Located just 25 minutes south of Kings Court Hotel, it makes for a perfect spring day out. Here are the essential Evesham Blossom Trail dates and route details you need to know.",
        "body": """
        <h2>When is the Blossom Trail? Typical Dates</h2>
        <p>The blossom season is short and highly dependent on spring weather conditions, but the Evesham Blossom Trail dates typically run from <strong>mid-March to mid-May</strong>. The display unfolds in stages:</p>
        <ul>
            <li><strong>Mid-March to Mid-April:</strong> The delicate white blossoms of local plum and damson trees appear first, blanketing the hedgerows.</li>
            <li><strong>Mid-April to Mid-May:</strong> The spectacular pink and white apple and pear blossoms follow, creating the peak visual display.</li>
        </ul>
        <p>We recommend contacting the local tourist information centre or checking blossom-watch updates online before your visit to ensure the orchards are in full bloom.</p>

        <h2>The Route: Exploring the 45-Mile Trail</h2>
        <p>The trail is fully signposted with distinctive blossom-themed signs, guiding you through historic towns and fruit-farming villages. Key stops along the route include:</p>
        <ul>
            <li><strong>Evesham:</strong> The historic market town serving as the start and end of the trail, featuring riverside gardens and a beautiful abbey park.</li>
            <li><strong>Pershore:</strong> Famous for its Georgian architecture and plum orchards, make a stop at Pershore Abbey.</li>
            <li><strong>The Lenches:</strong> A group of hillside villages offering elevated views across the blossom-filled valleys below.</li>
            <li><strong>Fladbury:</strong> A picturesque riverside village with historic mills and local pubs.</li>
        </ul>

        <blockquote>"To drive or cycle the Evesham Blossom Trail in late April is to experience one of the most beautiful spring spectacles in the United Kingdom."</blockquote>

        <h2>Tips for Cyclists and Walkers</h2>
        <p>While the 45-mile trail is ideal for a scenic drive, there are dedicated shorter cycling loops and walking paths that take you directly through the orchards. Be sure to stick to public footpaths and respect the local working farms.</p>

        <p>After a day of exploring the trail, return to Kings Court Hotel to enjoy a seasonal, freshly prepared dinner in our Garden Restaurant.</p>
        """
    }
]

# Read the template file
with open('blog-single.html', 'r', encoding='utf-8') as f:
    template_content = f.read()

# Define the regex to replace related articles section in individual blogs
# In the template, the related articles section starts at <section class="bs-related"> and ends at </section>
# Let's extract everything outside the main article body and header/footer, and replace it dynamically.

for blog in blogs_db:
    # 1. Start with copy of template
    content = template_content
    
    # 2. Replace metadata
    content = re.sub(r'<title>.*?</title>', f"<title>{blog['title']} | Kings Court Hotel Blog</title>", content)
    content = re.sub(r'<meta name="description"\s+content=".*?"\s*/>', f'<meta name="description" content="{blog["description"]}" />', content)
    content = re.sub(r'<meta property="og:title"\s+content=".*?"\s*/>', f'<meta property="og:title" content="{blog["title"]} | Kings Court Hotel Blog" />', content)
    content = re.sub(r'<meta property="og:description"\s+content=".*?"\s*/>', f'<meta property="og:description" content="{blog["description"]}" />', content)
    content = re.sub(r'<meta property="og:url"\s+content=".*?"\s*/>', f'<meta property="og:url" content="https://www.kingscourthotel.co.uk/{blog["filename"]}" />', content)
    content = re.sub(r'<link rel="canonical"\s+href=".*?"\s*/>', f'<link rel="canonical" href="https://www.kingscourthotel.co.uk/{blog["filename"]}" />', content)
    
    # Update Schema.org Json
    schema_regex = r'"headline": ".*?"'
    content = re.sub(schema_regex, f'"headline": "{blog["title"]}"', content)
    schema_desc_regex = r'"description": ".*?"'
    content = re.sub(schema_desc_regex, f'"description": "{blog["description"]}"', content)
    
    # 3. Replace Hero (OMIT IMAGES, use beautiful gold/green gradient background)
    hero_bg_replacement = '<div class="bs-hero__bg" style="background: linear-gradient(135deg, var(--clr-forest-dark) 0%, var(--clr-forest) 100%);"></div>'
    content = re.sub(r'<div class="bs-hero__bg">.*?</div>', hero_bg_replacement, content)
    # Replace tags
    content = re.sub(r'<span class="bs-hero__tag">.*?</span>', '<span class="bs-hero__tag">Local Attractions &amp; Heritage</span>', content)
    content = re.sub(r'<h1 class="bs-hero__title">.*?</h1>', f'<h1 class="bs-hero__title">{blog["title"]}</h1>', content)
    
    # Replace meta data inside hero
    meta_regex = r'<span><i class="fa-regular fa-calendar"></i>.*?</span>\s*<span><i class="fa-regular fa-clock"></i>.*?</span>\s*<span><i class="fa-solid fa-location-dot"></i>.*?</span>'
    new_meta = f'<span><i class="fa-regular fa-calendar"></i> {blog["date"]}</span>\\n                <span><i class="fa-regular fa-clock"></i> {blog["read_time"]}</span>\\n                <span><i class="fa-solid fa-location-dot"></i> {blog["meta_dist"]}</span>'
    content = re.sub(r'<span><i class="fa-regular fa-calendar"></i>.*?</span>\s*<span><i class="fa-regular fa-clock"></i>.*?</span>\s*<span><i class="fa-solid fa-location-dot"></i>.*?</span>', new_meta, content)
    
    # 4. Replace Article Content
    article_body = f"""<p>{blog["intro"]}</p>
{blog["body"]}

        <!-- Author -->
        <div class="bs-author">
            <div class="bs-author__avatar">KC</div>
            <div>
                <div class="bs-author__name">Kings Court Concierge</div>
                <div class="bs-author__bio">Our concierge team knows the area intimately. Ask us for personalised
                    recommendations during your stay — we're always happy to help plan your perfect day.</div>
            </div>
        </div>"""
        
    # Replace entire <article class="bs-article">...</article>
    start_art = content.find('<article class="bs-article">')
    end_art = content.find('</article>', start_art)
    if start_art != -1 and end_art != -1:
        content = content[:start_art + len('<article class="bs-article">\n')] + article_body + content[end_art:]

    # Write out the new blog post
    with open(blog["filename"], 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Generated: {blog['filename']}")

print("All 10 blogs generated successfully.")
