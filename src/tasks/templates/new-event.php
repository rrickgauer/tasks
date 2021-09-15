<!DOCTYPE html>
<html lang="en">

<head>
    <?php include('header.php'); ?>
    <title>Create new event</title>
</head>

<body>
    <?php include('navbar.php'); ?>
    <div class="container">

        <div class="d-flex justify-content-center">
            <!-- new event form -->
            <form class="form-event-new" autocomplete="off">
                <h4 class="mb-3">Basics</h4>
                <!-- name -->
                <div class="form-group form-event-new-group">
                    <label for="name-new">Name</label>
                    <input type="text" class="form-control  event-new-input" id="name-new" maxlength="100" autofocus>
                    <div class="invalid-feedback"></div>
                </div>

                <hr>

                <h4 class="mb-3">Occurs</h4>

                <!-- start and end times -->
                <div class="event-dates-new">
                    <div class="form-row">
                        <!-- starts on -->
                        <div class="form-group form-event-new-group col-md-9 col-sm-12">
                            <label for="starts-on-new">Starts</label>
                            <input type="date" class="form-control  event-new-input date" id="starts-on-new">
                            <div class="invalid-feedback"></div>
                        </div>

                        <!-- starts at -->
                        <div class="form-group form-event-new-group col-md-3 col-sm-12 time">
                            <label for="starts-at-new">At</label>
                            <div class="input-group">
                                <input type="time" class="form-control  event-new-input " id="starts-at-new" data-input>
                                <div class="input-group-append">
                                    <button class="btn btn-sm btn-outline-secondary" type="button" data-clear><i class='bx bx-x'></i></button>
                                </div>
                            </div>
                            <div class="invalid-feedback"></div>
                        </div>
                    </div>
                    <div class="form-row">
                        <!-- ends on -->
                        <div class="form-group form-event-new-group col-md-9 col-sm-12">
                            <label for="ends-on-new">Ends</label>
                            <input type="date" class="form-control  event-new-input date" id="ends-on-new">
                            <div class="invalid-feedback"></div>
                        </div>

                        <!-- ends at -->
                        <div class="form-group form-event-new-group col-md-3 col-sm-12 time">
                            <label for="ends-at-new">At</label>
                            <div class="input-group">
                                <input type="time" class="form-control  event-new-input" id="ends-at-new" data-input>
                                <div class="input-group-append">
                                    <button class="btn btn-sm btn-outline-secondary" type="button" data-clear><i class='bx bx-x'></i></button>
                                </div>
                            </div>
                            <div class="invalid-feedback"></div>
                        </div>
                    </div>

                </div>

                <!-- recurrence info -->
                <div class="form-group form-event-new-group">
                    <label for="frequency-new">Repeats</label>

                    <div class="event-recurrence-new">
                        <div class="input-group">
                            <select class="form-control  event-new-input custom-select" id="frequency-new">
                                <option value="ONCE">Does not repeat</option>
                                <option value="DAILY">Day</option>
                                <option value="WEEKLY">Week</option>
                                <option value="MONTHLY">Month</option>
                                <option value="YEARLY">Year</option>
                            </select>

                            <input type="number" class="form-control  event-new-input d-none" id="seperation-new" min="1" value="1" placeholder="Seperation">
                            <input type="number" pattern="[0-9]*" inputmode="numeric" class="form-control event-new-input recurrence d-none" id="recurrence-day-new" max="31" placeholder="Day">
                            <input type="number" pattern="[0-9]*" inputmode="numeric" class="form-control event-new-input recurrence d-none" id="recurrence-week-new" max="5" placeholder="Week">
                            <input type="number" pattern="[0-9]*" inputmode="numeric" class="form-control event-new-input recurrence d-none" id="recurrence-month-new" max="12" placeholder="Month">
                            <div class="invalid-feedback"></div>
                        </div>
                    </div>
                </div>

                <hr>
                <h4 class="mb-3">Location</h4>

                <!-- address -->
                <div class="form-row">
                    <!-- address 1 -->
                    <div class="form-group form-event-new-group col-md-9 col-sm-12">
                        <label for="address-1-new">Address 1</label>
                        <input type="text" class="form-control  event-new-input" id="address-1-new" maxlength="70">
                    </div>

                    <!-- address 2 -->
                    <div class="form-group form-event-new-group col-md-3 col-sm-12">
                        <label for="address-2-new">Address 2</label>
                        <input type="text" class="form-control  event-new-input" id="address-2-new" maxlength="70">
                    </div>
                </div>


                <div class="form-row">
                    <!-- city -->
                    <div class="form-group form-event-new-group col-md-6 col-sm-12">
                        <label for="city-new">City</label>
                        <input type="text" class="form-control  event-new-input" id="city-new" maxlength="40">
                    </div>

                    <!-- state -->
                    <div class="form-group form-event-new-group col-md-3 col-sm-12">
                        <label for="state-new">State</label>
                        <select id="state-new" class="form-control  event-new-input">
                            <option value="" selected disabled class="d-none">Choose...</option>
                            <?php include('state-abbvs-select.php'); ?>
                        </select>
                    </div>


                    <!-- zip -->
                    <div class="form-group form-event-new-group col-md-3 col-sm-12">
                        <label for="zip-new">Zip</label>
                        <input type="text" class="form-control  event-new-input" id="zip-new">
                    </div>
                </div>

                <!-- phone number -->
                <div class="form-group form-event-new-group">
                    <label for="phone-new">Phone</label>
                    <input type="tel" class="form-control  event-new-input" id="phone-new">
                </div>

                <button type="button" id="btn-submit-new-event" class="btn btn-lg btn-block btn-primary mt-4">Create event</button>
            </form>
        </div>







    </div>


    <?php include('event-modal.php'); ?>
    <?php include('footer.php'); ?>
    <script src="js/new-event.js"></script>
</body>

</html>