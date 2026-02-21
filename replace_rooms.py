import re

rooms_html_path = 'rooms.html'
with open(rooms_html_path, 'r', encoding='utf-8') as f:
    html = f.read()

# Replace the rooms filter
filter_replacement = """            <!-- Filter Bar -->
            <div class="rooms-filter" id="rooms-filter" role="group" aria-label="Filter rooms by category">
                <button class="rooms-filter__btn rooms-filter__btn--active" data-filter="all" id="filter-all"
                    aria-pressed="true">
                    <i class="fa-solid fa-border-all" aria-hidden="true"></i>
                    All Rooms
                    <span class="rooms-filter__count" id="count-all">5</span>
                </button>
                <button class="rooms-filter__btn" data-filter="single" id="filter-single" aria-pressed="false">
                    <i class="fa-solid fa-user" aria-hidden="true"></i>
                    Single
                    <span class="rooms-filter__count" id="count-single">1</span>
                </button>
                <button class="rooms-filter__btn" data-filter="standard-double" id="filter-standard" aria-pressed="false">
                    <i class="fa-solid fa-bed" aria-hidden="true"></i>
                    Standard Double
                    <span class="rooms-filter__count" id="count-standard">1</span>
                </button>
                <button class="rooms-filter__btn" data-filter="king" id="filter-king" aria-pressed="false">
                    <i class="fa-solid fa-crown" aria-hidden="true"></i>
                    King
                    <span class="rooms-filter__count" id="count-king">1</span>
                </button>
                <button class="rooms-filter__btn" data-filter="twin" id="filter-twin" aria-pressed="false">
                    <i class="fa-solid fa-bed" aria-hidden="true"></i>
                    Twin
                    <span class="rooms-filter__count" id="count-twin">1</span>
                </button>
                <button class="rooms-filter__btn" data-filter="quad" id="filter-quad" aria-pressed="false">
                    <i class="fa-solid fa-people-roof" aria-hidden="true"></i>
                    Quad
                    <span class="rooms-filter__count" id="count-quad">1</span>
                </button>
            </div>"""

html = re.sub(r'<!-- Filter Bar -->.*?</div>', filter_replacement, html, flags=re.DOTALL, count=1)

# Replace the rooms grid
grid_replacement = """            <!-- Rooms Grid -->
            <div class="rooms-grid" id="rooms-grid" aria-label="Room listings">

                <!-- ── SINGLE ROOM ── -->
                <article class="room-card reveal" data-category="single" id="room-single">
                    <div class="room-card__image">
                        <img src="assets/images/single-room/mobilescale.avif"
                            alt="Single Room" loading="lazy" />
                        <span class="room-card__badge room-card__badge--standard">Standard</span>
                        <div class="room-card__image-overlay" aria-hidden="true">
                            <span class="room-card__quick-view">Quick View</span>
                        </div>
                    </div>
                    <div class="room-card__body">
                        <div class="room-card__category-tag">Single Room</div>
                        <h3 class="room-card__title">Single Room</h3>
                        <p class="room-card__desc">
                            Perfect for solo travellers, offering a comfortable night's rest with all modern amenities.
                        </p>
                        <div class="room-card__amenities" aria-label="Room amenities">
                            <span class="room-card__amenity"><i class="fa-solid fa-bed" aria-hidden="true"></i> Single Bed</span>
                            <span class="room-card__amenity"><i class="fa-solid fa-wifi" aria-hidden="true"></i> Free Wi-Fi</span>
                            <span class="room-card__amenity"><i class="fa-solid fa-tv" aria-hidden="true"></i> Flatscreen TV</span>
                            <span class="room-card__amenity"><i class="fa-solid fa-mug-hot" aria-hidden="true"></i> Tea &amp; Coffee</span>
                        </div>
                        <div class="room-card__footer">
                            <div class="room-card__price">
                                <span class="room-card__price-from">From</span>
                                <span class="room-card__price-amount">£115</span>
                                <span class="room-card__price-night">per night</span>
                            </div>
                            <a href="room-detail.html?room=single" class="btn btn--dark" aria-label="View details for Single Room">
                                View Details <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
                            </a>
                        </div>
                    </div>
                </article>

                <!-- ── STANDARD DOUBLE ── -->
                <article class="room-card reveal reveal--delay-1" data-category="standard-double" id="room-standard">
                    <div class="room-card__image">
                        <img src="assets/images/standard-double-room/mobilescale.avif"
                            alt="Standard Double Room" loading="lazy" />
                        <div class="room-card__image-overlay" aria-hidden="true">
                            <span class="room-card__quick-view">Quick View</span>
                        </div>
                    </div>
                    <div class="room-card__body">
                        <div class="room-card__category-tag">Double Room</div>
                        <h3 class="room-card__title">Standard Double Room</h3>
                        <p class="room-card__desc">
                            Cosy and comfortable, featuring a pocket sprung mattress, en-suite bathroom, and tea/coffee making facilities for a relaxing retreat.
                        </p>
                        <div class="room-card__amenities" aria-label="Room amenities">
                            <span class="room-card__amenity"><i class="fa-solid fa-bed" aria-hidden="true"></i> Double Bed</span>
                            <span class="room-card__amenity"><i class="fa-solid fa-wifi" aria-hidden="true"></i> Free Wi-Fi</span>
                            <span class="room-card__amenity"><i class="fa-solid fa-tv" aria-hidden="true"></i> Flatscreen TV</span>
                            <span class="room-card__amenity"><i class="fa-solid fa-mug-hot" aria-hidden="true"></i> Tea &amp; Coffee</span>
                        </div>
                        <div class="room-card__footer">
                            <div class="room-card__price">
                                <span class="room-card__price-from">From</span>
                                <span class="room-card__price-amount">£145</span>
                                <span class="room-card__price-night">per night</span>
                            </div>
                            <a href="room-detail.html?room=standard-double" class="btn btn--dark" aria-label="View details for Standard Double">
                                View Details <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
                            </a>
                        </div>
                    </div>
                </article>

                <!-- ── KING ROOM ── -->
                <article class="room-card reveal reveal--delay-2" data-category="king" id="room-king">
                    <div class="room-card__image">
                        <img src="assets/images/king-room/mobilescale.avif" alt="King Room" loading="lazy" />
                        <span class="room-card__badge room-card__badge--popular">Most Popular</span>
                        <div class="room-card__image-overlay" aria-hidden="true">
                            <span class="room-card__quick-view">Quick View</span>
                        </div>
                    </div>
                    <div class="room-card__body">
                        <div class="room-card__category-tag">Premier Room</div>
                        <h3 class="room-card__title">King Room</h3>
                        <p class="room-card__desc">
                            Beautifully appointed with a large king bed, luxury pocket sprung mattress, and modern en-suite facilities. Perfect for a comfortable stay.
                        </p>
                        <div class="room-card__amenities" aria-label="Room amenities">
                            <span class="room-card__amenity"><i class="fa-solid fa-bed" aria-hidden="true"></i> King Bed</span>
                            <span class="room-card__amenity"><i class="fa-solid fa-fire" aria-hidden="true"></i> Heating</span>
                            <span class="room-card__amenity"><i class="fa-solid fa-wifi" aria-hidden="true"></i> Free Wi-Fi</span>
                            <span class="room-card__amenity"><i class="fa-solid fa-concierge-bell" aria-hidden="true"></i> Room Service</span>
                        </div>
                        <div class="room-card__footer">
                            <div class="room-card__price">
                                <span class="room-card__price-from">From</span>
                                <span class="room-card__price-amount">£195</span>
                                <span class="room-card__price-night">per night</span>
                            </div>
                            <a href="room-detail.html?room=king" class="btn btn--dark" aria-label="View details for King Room">
                                View Details <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
                            </a>
                        </div>
                    </div>
                </article>

                <!-- ── TWIN ROOM ── -->
                <article class="room-card reveal" data-category="twin" id="room-twin">
                    <div class="room-card__image">
                        <img src="assets/images/twin-room/mobilescale.avif" alt="Twin Room" loading="lazy" />
                        <div class="room-card__image-overlay" aria-hidden="true">
                            <span class="room-card__quick-view">Quick View</span>
                        </div>
                    </div>
                    <div class="room-card__body">
                        <div class="room-card__category-tag">Twin Room</div>
                        <h3 class="room-card__title">Twin Room</h3>
                        <p class="room-card__desc">
                            Offering luxury and comfort, equipped with two comfortable single beds featuring pocket sprung mattresses.
                        </p>
                        <div class="room-card__amenities" aria-label="Room amenities">
                            <span class="room-card__amenity"><i class="fa-solid fa-bed" aria-hidden="true"></i> Twin Beds</span>
                            <span class="room-card__amenity"><i class="fa-solid fa-wifi" aria-hidden="true"></i> Free Wi-Fi</span>
                            <span class="room-card__amenity"><i class="fa-solid fa-tv" aria-hidden="true"></i> Flatscreen TV</span>
                            <span class="room-card__amenity"><i class="fa-solid fa-mug-hot" aria-hidden="true"></i> Tea &amp; Coffee</span>
                        </div>
                        <div class="room-card__footer">
                            <div class="room-card__price">
                                <span class="room-card__price-from">From</span>
                                <span class="room-card__price-amount">£175</span>
                                <span class="room-card__price-night">per night</span>
                            </div>
                            <a href="room-detail.html?room=twin" class="btn btn--dark" aria-label="View details for Twin Room">
                                View Details <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
                            </a>
                        </div>
                    </div>
                </article>

                <!-- ── QUAD ROOM ── -->
                <article class="room-card reveal reveal--delay-1" data-category="quad" id="room-quad">
                    <div class="room-card__image">
                        <img src="assets/images/quad-room/mobilescale.avif" alt="Quad Room" loading="lazy" />
                        <span class="room-card__badge room-card__badge--family">Family / Group</span>
                        <div class="room-card__image-overlay" aria-hidden="true">
                            <span class="room-card__quick-view">Quick View</span>
                        </div>
                    </div>
                    <div class="room-card__body">
                        <div class="room-card__category-tag">Quad Room</div>
                        <h3 class="room-card__title">Quad Room</h3>
                        <p class="room-card__desc">
                            Our spacious family or group accommodation. Featuring beds to comfortably sleep up to four guests, with options for cots on request.
                        </p>
                        <div class="room-card__amenities" aria-label="Room amenities">
                            <span class="room-card__amenity"><i class="fa-solid fa-bed" aria-hidden="true"></i> Multi Bed</span>
                            <span class="room-card__amenity"><i class="fa-solid fa-people-roof" aria-hidden="true"></i> Sleeps up to 4</span>
                            <span class="room-card__amenity"><i class="fa-solid fa-baby-carriage" aria-hidden="true"></i> Cots Available</span>
                            <span class="room-card__amenity"><i class="fa-solid fa-wifi" aria-hidden="true"></i> Free Wi-Fi</span>
                        </div>
                        <div class="room-card__footer">
                            <div class="room-card__price">
                                <span class="room-card__price-from">From</span>
                                <span class="room-card__price-amount">£245</span>
                                <span class="room-card__price-night">per night</span>
                            </div>
                            <a href="room-detail.html?room=quad" class="btn btn--dark" aria-label="View details for Quad Room">
                                View Details <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
                            </a>
                        </div>
                    </div>
                </article>

            </div><!-- /.rooms-grid -->"""

html = re.sub(r'<!-- Rooms Grid -->.*?</div><!-- /.rooms-grid -->', grid_replacement, html, flags=re.DOTALL, count=1)

with open(rooms_html_path, 'w', encoding='utf-8') as f:
    f.write(html)

print("Updated rooms.html")
