require 'test_helper'

class RtsControllerTest < ActionController::TestCase
  setup do
    @rt = rts(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:rts)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create rt" do
    assert_difference('Rt.count') do
      post :create, rt: {  }
    end

    assert_redirected_to rt_path(assigns(:rt))
  end

  test "should show rt" do
    get :show, id: @rt
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @rt
    assert_response :success
  end

  test "should update rt" do
    patch :update, id: @rt, rt: {  }
    assert_redirected_to rt_path(assigns(:rt))
  end

  test "should destroy rt" do
    assert_difference('Rt.count', -1) do
      delete :destroy, id: @rt
    end

    assert_redirected_to rts_path
  end
end
