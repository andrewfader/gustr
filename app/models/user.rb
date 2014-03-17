class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :trackable, :validatable
  devise :omniauthable, :omniauth_providers => [:facebook]
  has_many :tags


  def self.find_for_facebook_oauth(auth, signed_in_resource=nil)
    user = User.where(email: auth.info.email).first || User.where(:provider => auth.provider, :uid => auth.uid).first
    unless user
      user = User.create(name:auth.extra.raw_info.name,
                         provider:auth.provider,
                         uid:auth.uid,
                         email:auth.info.email,
                         image_url:auth.info.image,
                         password:Devise.friendly_token[0,20]
                        )
    end
    user
  end

  def to_s
    self.first_name + " " + self.last_name
  end

end
