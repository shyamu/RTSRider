class RidersController < ApplicationController
  # GET /riders
  # GET /riders.json
  def index
    @riders_grid = initialize_grid(Rider)
  end
end
#def index
#  @col_headers = Customer.col_headers
#
#  # if @rows is nil, then index is being called directly (not coming from query method)
#  if @rows.nil?
#
#    @page = params[:page].blank? ? 1 : params[:page]
#    @items_per_page = params[:items_per_page].blank? ? 25 : params[:items_per_page]
#
#    start_time = params[:start_time]
#    end_time = params[:end_time]
#    if start_time.nil? or end_time.nil?
#      @rows = Customer.paginate(:page => @page, :per_page => @items_per_page)
#      #puts "#{start_time}, #{end_time}"
#    else
#      start_time = DateTime.parse(start_time).utc.strftime('%F %T')
#      end_time = DateTime.parse(end_time).utc.strftime('%F %T')
#      @rows = Customer.paginate(
#          :conditions => ['updated_at >= ? AND updated_at <= ?', start_time, end_time],
#          :page => @page, :per_page => @items_per_page)
#    end
#  end
#end