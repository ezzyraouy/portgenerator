<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('educations', function (Blueprint $table) {
            $table->id();
            $table->string('institution_name')->nullable()->comment('Name of the institution');
            $table->text('description_fr')->nullable()->comment('description in French');
            $table->text('description_en')->nullable()->comment('description in English');
            $table->string('address_fr')->nullable()->comment('Institution address in French');
            $table->string('address_en')->nullable()->comment('Institution address in English');
            $table->date('start_date')->nullable()->comment('Start date of the education program');
            $table->date('end_date')->nullable()->comment('End date of the education program');
            $table->boolean('is_current')->default(false)->comment('Indicates if the user is currently studying');
            $table->foreignId('user_id')->constrained()->comment('ID of the user');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('educations');
    }
};
